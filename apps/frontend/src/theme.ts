import { createMuiTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // main: "#25303b",
      // main: indigo[700],
      main: "#192027",
    },
    secondary: {
      main: "#ffb238",
    },
    background: {
      // default: "#212121",
      default: "#25303b",
    },
  },
  typography: {
    // fontFamily: `'Ubuntu', sans-serif;`,
  },
  overrides: {
    MuiToolbar: {
      root: {
        minHeight: `48px !important`,
      },
    },
  },
});

export default theme;
