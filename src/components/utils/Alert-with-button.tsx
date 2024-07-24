import { Backdrop, Alert, Button } from "@mui/material";

// ! Note: CANNOT use Redux selector in this component
export default function AlertWthBtn(props: { text: string }) {
  return (
    <Backdrop id="Alert-with-button" open={true} transitionDuration={0}>
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        }
      >
        {props.text}
      </Alert>
    </Backdrop>
  );
}
