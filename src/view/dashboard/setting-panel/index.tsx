import { memo } from "react";
import { Card, Stack } from "@mui/material";
import FileButton from "@/view/dashboard/setting-panel/FileButton.tsx";
import FileControl from "@/view/dashboard/setting-panel/FileControl.tsx";

export interface FileInfo {
  fileId: string;
  fileName: string;
  fileSize: string;
}
interface Props {
  findAddress: (address: string) => void;
  findContent: (content: string, index: number) => void;
  fileInfo: any;
  loadFileInfo: () => void;
}
const SettingPanel = memo((props: Props) => {
  return (
    <Card sx={{ height: "100%" }}>
      <Stack spacing={1}>
        <FileButton loadFileInfo={props.loadFileInfo} />
        <FileControl
          findContent={props.findContent}
          findAddress={props.findAddress}
          fileInfo={props.fileInfo}
        />
      </Stack>
    </Card>
  );
});

export default SettingPanel;
