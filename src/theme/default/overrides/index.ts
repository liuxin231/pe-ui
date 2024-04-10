import Button from "@/theme/default/overrides/Button.ts";
import Typography from "@/theme/default/overrides/Typography.ts";
import Card from "@/theme/default/overrides/Card.ts";
import Table from "@/theme/default/overrides/Table.ts";
import Input from "@/theme/default/overrides/Input.ts";
import Paper from "@/theme/default/overrides/Paper.ts";
import Tooltip from "@/theme/default/overrides/Tooltip.ts";
import Autocomplete from "@/theme/default/overrides/Autocomplete.ts";
import Backdrop from "@/theme/default/overrides/Backdrop.ts";

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Input(theme),
    Paper(),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme),
  );
}
