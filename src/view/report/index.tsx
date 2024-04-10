import { memo, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card } from "@mui/material";
import { Helmet } from "react-helmet-async";
import ListToolBar from "@/view/knowledge/ListToolBar.tsx";
import { DataGrid } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "@/components/custom-no-rows-overlay";
import { useSnackbar } from "notistack";
import moment from "moment";
import { deleteMany, getPageList } from "@/api/file.ts";
import axios from "axios";

const defaultData = [];
const Report = memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState(defaultData);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    getData(paginationModel, event.target.value);
  };
  const deleteData = (ids: string[]) => {
    deleteMany({ ids })
      .then(() => {
        enqueueSnackbar("删除成功!", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        getData(paginationModel, filterName);
      });
  };
  const onPaginationModelChange = (newPage) => {
    setPaginationModel(newPage);
    getData(newPage, filterName);
  };

  const getData = (newPage, filterName) => {
    setTableLoading(true);
    getPageList({
      page: newPage.page,
      size: newPage.pageSize,
      name: filterName,
    })
      .then((res) => {
        setRowCount(res.paginate.total);
        setData(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setTableLoading(false);
      });
  };
  const download_file = (file_id: string) => {
    console.log(file_id);
    axios
      .get("/api/file/download_file/" + file_id, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
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
  };
  const download_report = (file_id: string) => {
    axios
      .get("/api/file/download_report/" + file_id, {
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
  };
  useEffect(() => {
    getData(paginationModel, filterName);
  }, []);
  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Helmet>
        <title> 报告管理 | Pe </title>
      </Helmet>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ListToolBar
          selected={selected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          deleteData={deleteData}
        />
        <DataGrid
          loading={tableLoading}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ flexGrow: "1" }}
          rowCount={rowCount}
          pageSizeOptions={[10, 20, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelected(newRowSelectionModel);
          }}
          rowSelectionModel={selected}
          columns={[
            {
              field: "file_name",
              headerName: "文件名称",
              flex: 3,
              editable: true,
            },
            {
              field: "file_md5",
              headerName: "文件MD5",
              flex: 4,
              editable: true,
            },
            {
              field: "create_time",
              headerName: "创建时间",
              flex: 3,
              valueFormatter: ({ value }) => {
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
              },
            },
            {
              field: "modify_time",
              headerName: "修改时间",
              flex: 3,
              valueFormatter: ({ value }) => {
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
              },
            },
            {
              field: "operator",
              headerName: "操作",
              align: "left",
              flex: 5,
              renderCell: (param: any) => {
                return (
                  <ButtonGroup
                    orientation="horizontal"
                    aria-label="Vertical button group"
                    variant="text"
                  >
                    <Button
                      size="small"
                      onClick={() => download_file(param.id)}
                    >
                      源文件
                    </Button>
                    <Button
                      disabled={!param.row.has_report}
                      size="small"
                      onClick={() => download_report(param.id)}
                    >
                      报告
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => deleteData([param.id])}
                    >
                      删除
                    </Button>
                  </ButtonGroup>
                );
              },
            },
          ]}
          rows={data}
          slotProps={{
            pagination: {
              labelRowsPerPage: "每页",
            },
          }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Card>
    </Box>
  );
});

export default Report;
