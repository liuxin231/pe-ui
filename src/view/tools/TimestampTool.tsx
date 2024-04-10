import { memo, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowForward } from "@mui/icons-material";
import moment from "moment";

const TimestampTool = memo(() => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [writeTimestamp, setWriteTimestamp] = useState(moment().unix() + "");
  const [writeDateTime, setWriteDateTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss"),
  );
  const [covertTimestamp, setCovertTimestamp] = useState(moment().unix() + "");
  const [covertDateTime, setCovertDateTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss"),
  );

  const covertToTimestamp = () => {
    setCovertTimestamp(moment(writeDateTime).unix() + "");
  };
  const covertToDateTime = () => {
    setCovertDateTime(
      moment
        .unix(writeTimestamp as unknown as number)
        .format("YYYY-MM-DD HH:mm:ss"),
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <TextField
          disabled
          id="standard-basic"
          label="当前日期"
          variant="standard"
          value={currentTime.format("YYYY-MM-DD HH:mm:ss")}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          disabled
          id="standard-basic"
          label="当前时间戳"
          variant="standard"
          value={currentTime.unix()}
        />
      </Grid>
      <Grid xs={5}>
        <TextField
          id="standard-basic"
          label="日期"
          variant="standard"
          value={writeDateTime}
          onChange={(event) => setWriteDateTime(event.target.value)}
        />
      </Grid>
      <Grid xs={2}>
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={covertToTimestamp}
        >
          <ArrowForward />
        </IconButton>
      </Grid>
      <Grid xs={5}>
        <TextField
          disabled
          id="standard-basic"
          label="时间戳"
          variant="standard"
          value={covertTimestamp}
        />
      </Grid>
      <Grid xs={5}>
        <TextField
          id="standard-basic"
          label="时间戳"
          variant="standard"
          value={writeTimestamp}
          onChange={(event) => setWriteTimestamp(event.target.value)}
        />
      </Grid>
      <Grid xs={2}>
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={covertToDateTime}
        >
          <ArrowForward />
        </IconButton>
      </Grid>
      <Grid xs={5}>
        <TextField
          disabled
          id="standard-basic"
          label="日期"
          variant="standard"
          value={covertDateTime}
        />
      </Grid>
    </Grid>
  );
});

export default TimestampTool;
