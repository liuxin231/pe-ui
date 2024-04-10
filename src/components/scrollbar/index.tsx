import { memo } from "react";
import {
  StyledRootScrollbar,
  StyledScrollbar,
} from "@/components/scrollbar/styles.ts";
const Scrollbar = memo(
  ({ children, sx, ...other }: { children: any; sx: any }) => {
    return (
      <StyledRootScrollbar>
        <StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  },
);

export default Scrollbar;
