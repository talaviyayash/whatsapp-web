"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import theme from "./theme";
import { ReactNode } from "react";

interface ThemeRegistryProps {
  children: ReactNode;
}

const ThemeRegistry: React.FC<ThemeRegistryProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeRegistry;
