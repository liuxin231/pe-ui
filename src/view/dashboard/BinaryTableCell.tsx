import { memo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { update_file_byte } from "@/api/pe.ts";
import { enqueueSnackbar } from "notistack";

interface Props {
  content: string;
  index?: string;
  currentAddress?: boolean;
  currentContent?: boolean;
  loadFileInfo?: () => void;
  width: number;
}

const BinaryTableCell = memo((props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState(props.content);
  const [index] = useState(props.index);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const openUpdateDialog = () => {
    if (props.index) {
      setOpenDialog(true);
    }
  };
  const submit = () => {
    update_file_byte({
      index: index,
      byte: content,
    })
      .then((res) => {
        if (res.code == 0) {
          props.loadFileInfo();
          handleClose();
        } else {
          enqueueSnackbar(`${res.message} `, { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err} `, { variant: "error" });
      });
  };
  return (
    <>
      <TableCell
        onClick={openUpdateDialog}
        padding="none"
        width={props.width}
        sx={{
          cursor: "pointer",
          textAlign: "center",
          border: "none",
          backgroundColor: props.currentAddress
            ? "gray"
            : props.currentContent
              ? "darkgray"
              : "rgba(0, 0, 0, 0)",
        }}
        className={"Bytes_" + props.content}
        id={props.index}
      >
        <Tooltip title={props.index}>
          <Typography variant="caption" color="#FFF">
            {props.content}
          </Typography>
        </Tooltip>
      </TableCell>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>修改字节内容</DialogTitle>
        <DialogContent>
          <DialogContentText>修改地址 {props.index} 内容</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="address"
            disabled
            name="address"
            label="地址"
            variant="standard"
            sx={{ width: "500px" }}
            value={index}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="内容"
            variant="standard"
            sx={{ width: "500px" }}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
          <Button onClick={submit}>提交</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default BinaryTableCell;
