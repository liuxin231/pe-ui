import {
  alpha,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { Add, Delete, Search } from "@mui/icons-material";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 86,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));
const StyledSearch = styled(OutlinedInput)(({ theme }: { theme: any }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));
const ListToolBar = memo(
  ({
    selected,
    filterName,
    onFilterName,
    targetSaveForm,
    deleteData,
  }: {
    selected: any;
    filterName: string;
    onFilterName: any;
    targetSaveForm?: any;
    deleteData: any;
  }) => {
    return (
      <StyledRoot
        sx={{
          ...(selected.length > 0 && {
            color: "primary.main",
            bgcolor: "primary.lighter",
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography component="div" variant="subtitle1">
            {selected.length} selected
          </Typography>
        ) : (
          <StyledSearch
            size="small"
            value={filterName}
            onChange={onFilterName}
            placeholder="名称"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        )}

        {selected.length > 0 ? (
          <Tooltip title="删除知识库">
            <IconButton
              color="error"
              onClick={() => {
                deleteData(selected);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        ) : targetSaveForm ? (
          <Tooltip title="新增知识库">
            <IconButton onClick={targetSaveForm} color="primary">
              <Add />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </StyledRoot>
    );
  },
);

export default ListToolBar;
