import { memo, useEffect, useState } from "react";
import { Box, Button, Card, Chip } from "@mui/material";
import { Helmet } from "react-helmet-async";
import ListToolBar from "@/view/knowledge/ListToolBar.tsx";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "@/components/custom-no-rows-overlay";
import { deleteMany, getPageList, save } from "@/api/knowledge.ts";
import SaveForm from "@/view/knowledge/SaveForm.tsx";
import { useSnackbar } from "notistack";
import moment from "moment";

const defaultData = [];
const Knowledge = memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const [saveFormOpen, setSaveFormOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState(defaultData);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");

  const targetSaveForm = () => {
    setSaveFormOpen((old) => !old);
  };
  const closeSaveForm = () => {
    setSaveFormOpen(false);
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
  const submitSaveForm = (formData: any) => {
    save(formData)
      .then(() => {
        enqueueSnackbar("保存成功!", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        getData(paginationModel, filterName);
      });
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    getData(paginationModel, event.target.value);
  };
  const onPaginationModelChange = (newPage) => {
    setPaginationModel(newPage);
    getData(newPage, filterName);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    submitSaveForm({
      id: newRow.id,
      name: newRow.func_name,
      desc: newRow.func_desc,
      is_sensitive: newRow.is_sensitive,
    });
    getData(paginationModel, filterName);
    return newRow;
  };
  const processRowUpdateError = () => {
    getData(paginationModel, filterName);
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
  useEffect(() => {
    getData(paginationModel, filterName);
  }, []);
  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Helmet>
        <title> 知识库管理 | Pe </title>
      </Helmet>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ListToolBar
          selected={selected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          targetSaveForm={targetSaveForm}
          deleteData={deleteData}
        />
        <DataGrid
          loading={tableLoading}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ flexGrow: "1" }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={processRowUpdateError}
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
              field: "func_name",
              headerName: "函数名称",
              flex: 3,
              editable: true,
            },
            {
              field: "func_desc",
              headerName: "函数描述",
              flex: 4,
              editable: true,
            },
            {
              field: "is_sensitive",
              type: "boolean",
              headerName: "敏感",
              flex: 2,
              editable: true,
              renderCell: (param) => {
                if (param.row.is_sensitive) {
                  return (
                    <Chip
                      size="small"
                      label="敏感"
                      color="error"
                      variant="filled"
                    />
                  );
                } else {
                  return (
                    <Chip
                      size="small"
                      label="非敏感"
                      color="primary"
                      variant="filled"
                    />
                  );
                }
              },
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
              flex: 3,
              renderCell: (param: any) => {
                return (
                  <Button size="small" onClick={() => deleteData([param.id])}>
                    删除
                  </Button>
                );
              },
            },
          ]}
          rows={data}
          slotProps={{
            pagination: {
              labelRowsPerPage: "每页",
              // labelDisplayedRows: (paginationInfo) => `${paginationInfo.page}`,
            },
          }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Card>
      <SaveForm
        open={saveFormOpen}
        onClose={closeSaveForm}
        submit={submitSaveForm}
      />
    </Box>
  );
});

export default Knowledge;
