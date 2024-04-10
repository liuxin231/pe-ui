import { memo } from "react";
import { AppBar, styled } from "@mui/material";
import { bgBlur } from "@/utils/cssStyles.ts";

const NAV_WIDTH = 280;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...(bgBlur({ color: theme.palette.background.default }) as any),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));
const Header = memo(() => {
  return <StyledRoot></StyledRoot>;
});

export default Header;
