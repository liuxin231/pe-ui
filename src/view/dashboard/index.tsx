import { Box, Paper, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Unstable_Grid2";
import BinaryTable from "@/view/dashboard/BinaryTable.tsx";
import SettingPanel, { FileInfo } from "@/view/dashboard/setting-panel";
import { useEffect, useState } from "react";
import { get_upload_file_info } from "@/api/pe.ts";
import { enqueueSnackbar } from "notistack";

const Item = styled(Paper)(({ theme }) => ({
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0)",
  overflow: "hidden",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const DefaultDashboard = () => {
  const [binaryTableData, setBinaryTableData] = useState([]);
  const [addressValue, setAddressValue] = useState("");
  const [content, setContent] = useState("");
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    fileId: "",
    fileName: "",
    fileSize: "",
  });
  const setBinaryData = (data) => {
    setBinaryTableData(data);
  };
  const loadFileInfo = () => {
    setContent("");
    setAddressValue("");
    get_upload_file_info()
      .then((res) => {
        if (res.data) {
          setFileInfo({
            fileId: res.data.file_id,
            fileName: res.data.file_name,
            fileSize: res.data.file_size,
          });
          setBinaryData(res.data.address_group_information);
        } else {
          setFileInfo({
            fileId: "",
            fileName: "",
            fileSize: "",
          });
          setBinaryData([]);
        }
      })
      .catch((err) => {
        enqueueSnackbar(`获取文件信息失败, ${err} `, { variant: "error" });
      });
  };
  const findAddress = (address: string) => {
    if (address && address.length > 0) {
      const element = document.getElementById(address);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setAddressValue(address);
      }
    } else {
      setAddressValue("");
    }
  };
  const findContent = (content: string, index: number) => {
    if (content.length == 0) {
      setContent("\0");
    } else {
      setContent(content);
    }
    const elements = document.getElementsByClassName("Bytes_" + content) as any;
    if (elements && elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "darkgray";
      }
    }
    const currentIndex =
      index > elements.length - 1 ? elements.length - 1 : index;
    const currentElement = elements[currentIndex];
    if (currentElement) {
      currentElement.style.backgroundColor = "rgba(255, 234, 124, .5)";
      currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  useEffect(() => {
    loadFileInfo();
  }, []);
  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Helmet>
        <title> 首页 | Pe </title>
      </Helmet>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%", overflow: "hidden", margin: 0, padding: 0 }}
      >
        <Grid md={9} sx={{ height: "100%", overflow: "hidden" }}>
          <Item>
            <BinaryTable
              data={binaryTableData}
              findAddress={addressValue}
              findContent={content}
              loadFileInfo={loadFileInfo}
            />
          </Item>
        </Grid>
        <Grid md={3}>
          <Item>
            <SettingPanel
              findAddress={findAddress}
              findContent={findContent}
              fileInfo={fileInfo}
              loadFileInfo={loadFileInfo}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
