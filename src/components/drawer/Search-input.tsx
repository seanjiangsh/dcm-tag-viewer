import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { ListItem, TextField } from "@mui/material";
import { debounce } from "throttle-debounce";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectDrawer, selectFile } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setDrawerFilter, setExpandAll } = layoutActions;

export default function SearchInput() {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);
  const { opened } = useSelector(selectDrawer);

  const [search, setSearch] = useState("");

  const searchChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setSearch(e.target.value);

  const dispatchSearch = useCallback(
    debounce(500, (val: string) => {
      dispatch(setDrawerFilter(val));
      dispatch(setExpandAll(false));
    }),
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

  // * Clear search input when file data is cleared
  useEffect(() => {
    if (!file) setSearch("");
  }, [file]);

  return (
    file && (
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
