import { memo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface Props {
  open?: boolean;
  onClose: () => void;
  submit: (formData: any) => void;
}
const initData = {
  name: "",
  desc: "",
  is_sensitive: false,
};
const SaveForm = memo(({ open = false, onClose, submit }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(initData);
  const closeForm = () => {
    setData(initData);
    onClose();
  };
  const changeValue = (key, value) => {
    setData((old) => {
      old[key] = value;
      return old;
    });
  };
  const onSubmit = () => {
    if (data.name.trim().length == 0) {
      enqueueSnackbar("函数名称不能为空!", { variant: "error" });
      return;
    }
    submit(data);
    closeForm();
  };
  return (
    <Dialog fullWidth open={open} onClose={closeForm}>
      <DialogTitle>新增知识库</DialogTitle>
      <DialogContent>
        <Stack spacing={5}>
          <DialogContentText>
            <Typography variant="caption">
              敏感方法将在文件分析时进行自动检测
            </Typography>
          </DialogContentText>

          <TextField
            focused
            label="函数名称"
            fullWidth
            variant="standard"
            onChange={(event) => changeValue("name", event.target.value)}
          />
          <TextField
            focused
            label="函数描述"
            fullWidth
            variant="standard"
            onChange={(event) => changeValue("desc", event.target.value)}
          />
          <FormControlLabel
            control={<Switch />}
            label="敏感"
            onChange={(_event, checked) => changeValue("is_sensitive", checked)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm}>关闭</Button>
        <Button onClick={onSubmit}>提交</Button>
      </DialogActions>
    </Dialog>
  );
});

export default SaveForm;
