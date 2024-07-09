import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { ListItem, TextField } from "@mui/material";
import { debounce } from "throttle-debounce";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectDrawer, selectFileData } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setDrawerFilter } = layoutActions;

export default function SearchInput() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const { opened } = useSelector(selectDrawer);

  const [search, setSearch] = useState("");

  const searchChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setSearch(e.target.value);

  const dispatchSearch = useCallback(
    debounce(500, (val: string) => dispatch(setDrawerFilter(val))),
    [dispatch]
  );

  // * Dispatch search filter with debounce
  useEffect(() => {
    if (typeof search === "string") dispatchSearch(search);
  }, [search, dispatchSearch]);

  // * Focus on search input when drawer is opened
  useEffect(() => {
    if (!opened) return;
    const searchElem = document.getElementById("drawer-search");
    searchElem?.focus();
  }, [opened]);

  return (
    fileData && (
      <ListItem>
        <TextField
          autoFocus
          size="small"
          variant="outlined"
          id="Search-input"
          label="Search"
          onChange={searchChange}
          value={search}
        />
      </ListItem>
    )
  );
}
