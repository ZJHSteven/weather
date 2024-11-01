import MuiGlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

export function GlobalStyles() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const styles = useMemo(() => {
    return {
      div: {
        ":not(html):not(body)::-webkit-scrollbar": {
          backgroundColor: "transparent",
          borderRadius: "100px",
        },
        ":not(html):not(body)::-webkit-scrollbar:vertical": {
          width: "10px",
        },
        ":not(html):not(body)::-webkit-scrollbar:horizontal": {
          height: "10px",
        },
        ":not(html):not(body)::-webkit-scrollbar:hover": {
          backgroundColor:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.09)"
              : "rgba(0, 0, 0, 0.09)",
        },
        ":not(html):not(body)::-webkit-scrollbar-thumb": {
          backgroundColor:
            mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
          borderRadius: "16px",
          backgroundClip: "padding-box",
          border: "2px solid transparent",
        },
        ":not(html):not(body)::-webkit-scrollbar-thumb:vertical": {
          minHeight: "10px",
        },
        ":not(html):not(body)::-webkit-scrollbar-thumb:horizontal": {
          minWidth: "10px",
        },
        ":not(html):not(body)::-webkit-scrollbar-thumb:active": {
          backgroundColor:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.61)"
              : "rgba(0, 0, 0, 0.61)",
        },
      },
    };
  }, [mode]);

  return <MuiGlobalStyles styles={styles} />;
}
