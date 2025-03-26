import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
    primary: {
      main: "#ffffff", // White text/icons for better visibility
    },
    background: {
      default: "#121212", // Uniform dark background
      paper: "#1E1E1E", // Slightly lighter for cards/modal
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#B0B0B0", // Grey text for contrast
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212", // Same as page background
          borderBottom: "1px solid #333", // Subtle border for separation
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E", // Same as card background
          padding: "20px",
          borderRadius: "10px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
