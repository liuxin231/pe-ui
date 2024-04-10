import { memo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Directions } from "@mui/icons-material";
import { FileInfo } from "@/view/dashboard/setting-panel/index.tsx";
import { enqueueSnackbar } from "notistack";
import { analysis } from "@/api/pe.ts";

interface Props {
  fileInfo?: FileInfo;
  findAddress: (address: string) => void;
  findContent: (content: string, index: number) => void;
}
const FileControl = memo((props: Props) => {
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [contentIndex, setContentIndex] = useState(0);
  const analysis_file = () => {
    if (props.fileInfo.fileId) {
      analysis(props.fileInfo.fileId)
        .then((res) => {
          enqueueSnackbar(`分析完成, ${res.message} `, {
            variant: "success",
          });
        })
        .catch((err) => {
          enqueueSnackbar(`文件上传失败, ${err} `, { variant: "error" });
        });
    } else {
      enqueueSnackbar(`请上传文件 `, { variant: "warning" });
    }
  };
  const searchContent = (index: number) => {
    const currentIndex = index < 0 ? 0 : index;
    setContentIndex(currentIndex);
    props.findContent(content, currentIndex);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="column" spacing={3}>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ px: 1, py: 3 }}
          spacing={2}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            文件信息
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="文件名"
            variant="standard"
            color="warning"
            focused
            disabled
            value={props.fileInfo?.fileName}
          />
          <TextField
            fullWidth
            size="small"
            label="文件大小"
            variant="standard"
            color="warning"
            focused
            disabled
            value={props.fileInfo?.fileSize}
          />
        </Stack>
        <Divider />

        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
          spacing={3}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            搜索
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="搜索内容"
            variant="standard"
            color="primary"
            focused
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <ButtonGroup variant="outlined" fullWidth>
            <Button onClick={() => searchContent(contentIndex - 1)}>
              上一个
            </Button>
            <Button onClick={() => searchContent(contentIndex + 1)}>
              下一个
            </Button>
          </ButtonGroup>
        </Stack>
        <Divider />
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
          spacing={3}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            前往
          </Typography>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="当前地址"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={() => props.findAddress(address)}
            >
              <Directions />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
          spacing={3}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            分析
          </Typography>

          <ButtonGroup variant="text" fullWidth color="secondary">
            <Button onClick={analysis_file}>分析</Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Box>
  );
});

export default FileControl;
