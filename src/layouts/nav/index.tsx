import { memo } from "react";
import { Box, Drawer } from "@mui/material";
import Logo from "@/components/logo";
import navConfig from "@/layouts/nav/config.tsx";
import NavSection from "@/components/nav-section";

const NAV_WIDTH = 200;

const Nav = memo(() => {
  const renderContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      <Box>
        <NavSection data={navConfig} />
      </Box>
    </Box>
  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: "background.default",
            borderRightStyle: "dashed",
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
});

export default Nav;
