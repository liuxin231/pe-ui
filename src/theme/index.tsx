import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import palette from "@/theme/default/palette.ts";
import typography from "@/theme/default/typography.ts";
import shadows from "@/theme/default/shadows.ts";
import ComponentsOverrides from "@/theme/default/overrides";
import customShadows from "@/theme/default/customShadows.ts";
import GlobalStyles from "@/theme/default/globalStyles.tsx";

const ThemeProvider = ({ children }) => {
  const themeOptions = {
    palette,
    shape: { borderRadius: 6 },
    typography,
    shadows: shadows,
    customShadows: customShadows(),
  };
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
