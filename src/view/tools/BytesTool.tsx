import { memo, useState } from "react";
import { Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { decodeApi, encodeApi } from "@/api/tools.ts";

const BytesTool = memo(() => {
  const [decodeValue, setDecodeValue] = useState("");
  const [encodeValue, setEncodeValue] = useState("");
  const encode = () => {
    encodeApi(decodeValue)
      .then((res) => {
        setEncodeValue(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const decode = () => {
    decodeApi(encodeValue)
      .then((res) => {
        setDecodeValue(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Stack spacing={2} sx={{ width: "500px" }}>
      <TextField
        id="filled-multiline-static"
        label=""
        multiline
        rows={10}
        variant="filled"
        value={decodeValue}
        onChange={(event) => setDecodeValue(event.target.value)}
      />
      <ButtonGroup
        fullWidth
        variant="contained"
        aria-label="Basic button group"
      >
        <Button endIcon={<ArrowDownward />} onClick={encode}>
          编码
        </Button>
        <Button endIcon={<ArrowUpward />} onClick={decode}>
          解码
        </Button>
      </ButtonGroup>
      {/*<ToggleButtonGroup color="primary" exclusive aria-label="Platform">*/}
      {/*  <ToggleButton value="encode" onClick={encode}>*/}
      {/*    编码*/}
      {/*  </ToggleButton>*/}
      {/*  <ToggleButton value="decode" onClick={decode}>*/}
      {/*    解码*/}
      {/*  </ToggleButton>*/}
      {/*</ToggleButtonGroup>*/}
      <TextField
        id="filled-multiline-static"
        label=""
        multiline
        rows={10}
        variant="filled"
        value={encodeValue}
        onChange={(event) => setEncodeValue(event.target.value)}
      />
    </Stack>
  );
});

export default BytesTool;
