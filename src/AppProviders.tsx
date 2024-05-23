import { ErrorBoundary } from "react-error-boundary";

// * react-redux (data)
import { store } from "@redux/root-store";
import { Provider } from "react-redux";
// * router
import { BrowserRouter } from "react-router-dom";
// * theming
import { ThemeProvider } from "@mui/material/styles";
import theme from "@utils/theme";

import App from "./App";
import AlertWthBtn from "@componentUtils/Alert-with-button";

const ErrorFallback = (err: any) => {
  console.error(err);
  return <AlertWthBtn text="Sorry, something went wrong..." />;
};

export default function AppProviders() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
