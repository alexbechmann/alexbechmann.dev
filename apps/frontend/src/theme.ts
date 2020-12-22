import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#25303b",
    },
    secondary: {
      main: "#ffb238",
    },
  },
  typography: {
    fontFamily: `'Ubuntu', sans-serif;`,
  },
});

export default theme;
