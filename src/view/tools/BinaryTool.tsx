import { memo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

const BinaryTool = memo(() => {
  const [value, setValue] = useState(String(0));
  const [alignment, setAlignment] = useState<string | null>("10");
  const handleAlignment = (_event: any, newAlignment: string | null) => {
    if (newAlignment) {
      setValue(
        parseInt(value, parseInt(alignment)).toString(parseInt(newAlignment)),
      );
      setAlignment(newAlignment);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TextField
          id="standard-basic"
          label="结果"
          variant="standard"
          focused
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Grid>
      <Grid xs={12}>
        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="Platform"
          value={alignment}
          onChange={handleAlignment}
        >
          <ToggleButton value="2">2</ToggleButton>
          <ToggleButton value="8">8</ToggleButton>
          <ToggleButton value="10">10</ToggleButton>
          <ToggleButton value="16">16</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
});

export default BinaryTool;
