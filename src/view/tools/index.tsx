import { memo, useState } from "react";
import { Box, Container, Dialog, DialogContent } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Unstable_Grid2";
import ToolsCard from "@/view/tools/ToolsCard.tsx";
import TimestampTool from "@/view/tools/TimestampTool.tsx";
import BinaryTool from "@/view/tools/BinaryTool.tsx";
import BytesTool from "@/view/tools/BytesTool.tsx";

const Tools = memo(() => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toolType, setToolType] = useState<"timestamp" | "binary" | "bytes">(
    "timestamp",
  );
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const openDialog = (toolType: "timestamp" | "binary" | "bytes") => {
    setToolType(toolType);
    setDialogOpen(true);
  };
  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Helmet>
        <title> 小工具 | Pe </title>
      </Helmet>
      <Container>
        <Grid container spacing={3}>
          <ToolsCard
            title={"时间戳转换"}
            onOpen={() => openDialog("timestamp")}
            cover={"/assets/images/covers/cover_23.jpg"}
          />
          <ToolsCard
            title={"字节转换"}
            onOpen={() => openDialog("bytes")}
            cover={"/assets/images/covers/cover_13.jpg"}
          />
          <ToolsCard
            title={"进制转换"}
            onOpen={() => openDialog("binary")}
            cover={"/assets/images/covers/cover_17.jpg"}
          />
        </Grid>
      </Container>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogContent>
          {toolType == "timestamp" ? (
            <TimestampTool />
          ) : toolType == "binary" ? (
            <BinaryTool />
          ) : (
            <BytesTool />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
});

export default Tools;
