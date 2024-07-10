import {
  createContext,
  useState,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const ThemeProviderContext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const thm = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ theme, ownerState }) => ({
              lineHeight: "1.5rem",
              fontSize: 14,
              padding: ownerState.size == "small" ? undefined : "10px 28px",
              borderWidth:
                ownerState.variant == "outlined" ? "2px !important" : undefined,
              fontWeight: 600,
              textTransform: "none",
              [theme.breakpoints.up("md")]: {
                fontSize: 18,
                padding: ownerState.size == "small" ? "8px 16px" : "12px 28px",
              },
            }),
          },
        },
      },
      palette: {
        mode,
        ...(mode === "light" ? {} : {}),
      },
    });
    return thm;
  }, [mode]);
  return (
    <ThemeProviderContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </ThemeProviderContext.Provider>
  );
}
