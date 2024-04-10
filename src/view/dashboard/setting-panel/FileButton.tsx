import { memo, useState } from "react";
import { Box, Button, ButtonGroup, styled, useTheme } from "@mui/material";
import {init_upload_file, upload } from "@/api/pe.ts";
import { useSnackbar } from "notistack";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});

interface Props {
  loadFileInfo: () => void;
}
const FileButton = memo((props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    upload(formData)
      .then((res) => {
        if (res.code == 0) {
          props.loadFileInfo();
        }
        enqueueSnackbar(`文件上传成功!`, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`文件上传失败, ${err} `, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const download_current_file = () => {
    axios
        .get("/api/pe/download_current_file", {
          responseType: "blob",
        })
        .then((res) => {
          const FileName = res?.headers["content-disposition"] || "";
          const fileName: any = window.decodeURI(FileName?.split("=")[1]);
          const url = window.URL.createObjectURL(
              new Blob([res.data], {
                // type: "application/vnd.ms-excel",
              }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
        });
  }
  const clearCurrentFile = () => {
    init_upload_file()
        .then((res) => {
          if (res.code == 0) {
            enqueueSnackbar(`初始化成功!`, { variant: "success" });
            props.loadFileInfo();
          } else {
            enqueueSnackbar(`初始化失败, ${res.message} `, { variant: "error" });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`初始化失败, ${err} `, { variant: "error" });
        })
  }
  return (
    <Box
      sx={{
        padding: "5px",
        width: "100%",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <ButtonGroup fullWidth variant="text">
        <Button component="label" sx={{ color: "#FFF" }} disabled={loading}>
          {loading ? "上传中..." : "上传文件"}
          <VisuallyHiddenInput
            type="file"
            accept="*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </Button>
        <Button sx={{ color: "#FFF" }} onClick={download_current_file}>下载文件</Button>
        <Button sx={{ color: "#FFF" }} onClick={clearCurrentFile}>初始化</Button>
      </ButtonGroup>
    </Box>
  );
});
export default FileButton;
