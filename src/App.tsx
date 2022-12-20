import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./routes/AppRoutes";
import theme from "./config/theme";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
