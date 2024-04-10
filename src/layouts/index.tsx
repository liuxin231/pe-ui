import { memo } from "react";
import { styled } from "@mui/material";
import ThemeProvider from "@/theme";
import Nav from "@/layouts/nav";
import Router from "@/router";
import { BrowserRouter, Outlet } from "react-router-dom";
import Logo from "@/components/logo";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/scroll-to-top";
import { SnackbarProvider } from "notistack";

const APP_BAR_DESKTOP = 0;
const StyledRoot = styled("div")({
  display: "flex",
  height: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const SimpleLayout = memo(() => {
  const StyledHeader = styled("header")(({ theme }) => ({
    top: 0,
    left: 0,
    lineHeight: 0,
    width: "100%",
    position: "absolute",
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5, 5, 0),
    },
  }));
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>
      <Outlet />
    </>
  );
});
export const AppLayout = memo(() => {
  return (
    <StyledRoot>
      <Nav />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
});
const App = memo(() => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <ScrollToTop />
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
});
export default App;
