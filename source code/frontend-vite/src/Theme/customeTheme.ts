import { createTheme } from "@mui/material";
import type { ThemeMode } from "./ThemeContext";

export const getCustomTheme = (mode: ThemeMode) => {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: dark ? "#d4af37" : "#9a7b1e",
        contrastText: dark ? "#0a0a0b" : "#ffffff",
      },
      secondary: {
        main: dark ? "#1c1c21" : "#f1ead9",
        contrastText: dark ? "#f5efe0" : "#3a2f10",
      },
      background: {
        default: dark ? "#0a0a0b" : "#faf8f3",
        paper: dark ? "#131316" : "#ffffff",
      },
      text: {
        primary: dark ? "#f5efe0" : "#1a1711",
        secondary: dark ? "#a1a1aa" : "#65625a",
      },
      divider: dark ? "rgba(212,175,55,0.16)" : "rgba(154,123,30,0.25)",
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 999,
          },
          containedPrimary: dark
            ? {
                background: "linear-gradient(135deg,#e8c96a 0%,#d4af37 45%,#9a7b1e 100%)",
                color: "#0a0a0b",
                "&:hover": {
                  background: "linear-gradient(135deg,#f2d98c 0%,#d4af37 55%,#8a6d1a 100%)",
                },
              }
            : {
                background: "linear-gradient(135deg,#c39a2e 0%,#9a7b1e 55%,#7a6116 100%)",
                color: "#ffffff",
                "&:hover": {
                  background: "linear-gradient(135deg,#d4af37 0%,#8a6d1a 60%,#6e5714 100%)",
                },
              },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: dark ? "#131316" : "#ffffff",
            border: dark ? "1px solid rgba(212,175,55,0.14)" : "1px solid rgba(154,123,30,0.2)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            "& fieldset": { borderColor: dark ? "rgba(212,175,55,0.25)" : "rgba(154,123,30,0.35)" },
            "&:hover fieldset": { borderColor: dark ? "rgba(212,175,55,0.55)" : "#9a7b1e" },
          },
        },
      },
    },
  });
};

// Backwards-compatible default export (dark).
const customeTheme = getCustomTheme("dark");

export default customeTheme;
