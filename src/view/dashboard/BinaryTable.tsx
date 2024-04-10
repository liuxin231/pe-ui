import { forwardRef, Fragment, memo, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BinaryTableCell from "@/view/dashboard/BinaryTableCell.tsx";
import { TableComponents, TableVirtuoso } from "react-virtuoso";

interface Data {
  address: string;
  a0: ByteInfo;
  a1: ByteInfo;
  a2: ByteInfo;
  a3: ByteInfo;
  a4: ByteInfo;
  a5: ByteInfo;
  a6: ByteInfo;
  a7: ByteInfo;
  a8: ByteInfo;
  a9: ByteInfo;
  a10: ByteInfo;
  a11: ByteInfo;
  a12: ByteInfo;
  a13: ByteInfo;
  a14: ByteInfo;
  a15: ByteInfo;
  translation: string;
}

interface ByteInfo {
  index: number;
  bytes: string;
}

function createData(
  address: string,
  a0: ByteInfo,
  a1: ByteInfo,
  a2: ByteInfo,
  a3: ByteInfo,
  a4: ByteInfo,
  a5: ByteInfo,
  a6: ByteInfo,
  a7: ByteInfo,
  a8: ByteInfo,
  a9: ByteInfo,
  a10: ByteInfo,
  a11: ByteInfo,
  a12: ByteInfo,
  a13: ByteInfo,
  a14: ByteInfo,
  a15: ByteInfo,
  translation: string,
): Data {
  return {
    address,
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12,
    a13,
    a14,
    a15,
    translation,
  };
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  width: number;
}
const columns: ColumnData[] = [
  { width: 90, label: "地址", dataKey: "address" },
  { width: 30, label: "a0", dataKey: "a0" },
  { width: 30, label: "a1", dataKey: "a1" },
  { width: 30, label: "a2", dataKey: "a2" },
  { width: 30, label: "a3", dataKey: "a3" },
  { width: 30, label: "a4", dataKey: "a4" },
  { width: 30, label: "a5", dataKey: "a5" },
  { width: 30, label: "a6", dataKey: "a6" },
  { width: 30, label: "a7", dataKey: "a7" },
  { width: 30, label: "a8", dataKey: "a8" },
  { width: 30, label: "a9", dataKey: "a9" },
  { width: 30, label: "a10", dataKey: "a10" },
  { width: 30, label: "a11", dataKey: "a11" },
  { width: 30, label: "a12", dataKey: "a12" },
  { width: 30, label: "a13", dataKey: "a13" },
  { width: 30, label: "a14", dataKey: "a14" },
  { width: 30, label: "a15", dataKey: "a15" },
  { width: 120, label: "转译", dataKey: "translation" },
];
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "#1A2027",
            border: "none",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}
const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      sx={{ width: "100%", overflowY: "auto", backgroundColor: "#1A2027" }}
      component={Paper}
      {...props}
      ref={ref}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ ...props }) => <TableRow {...props} />,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} style={{ marginTop: "60px" }} />
  )),
};

interface Props {
  data: Array<any>;
  findAddress: string;
  findContent: string;
  loadFileInfo: () => void;
}
const BinaryTable = memo((props: Props) => {
  const [rows, setRows] = useState<Data[]>([]);
  const rowContent = (_index: number, row: Data) => {
    return (
      <Fragment>
        <BinaryTableCell width={120} content={row.address} />
        {Array.from({ length: 16 }, (_, i) => i).map((item) => (
          <BinaryTableCell
            width={30}
            key={item}
            loadFileInfo={props.loadFileInfo}
            currentAddress={
              props.findAddress.toUpperCase() ==
              row["a" + item].index.toString(16).toUpperCase()
            }
            currentContent={
              row["a" + item].bytes.toUpperCase() ==
              props.findContent.toUpperCase()
            }
            index={row["a" + item].index.toString(16).toUpperCase()}
            content={row["a" + item].bytes}
          />
        ))}
        <BinaryTableCell width={120} content={row.translation} />
      </Fragment>
    );
  };
  useEffect(() => {
    setRows(
      props.data.map((item) => {
        return createData(
          item.address,
          item.bytes[0],
          item.bytes[1],
          item.bytes[2],
          item.bytes[3],
          item.bytes[4],
          item.bytes[5],
          item.bytes[6],
          item.bytes[7],
          item.bytes[8],
          item.bytes[9],
          item.bytes[10],
          item.bytes[11],
          item.bytes[12],
          item.bytes[13],
          item.bytes[14],
          item.bytes[15],
          item.translation,
        );
      }),
    );
  }, [props]);
  return (
    <>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </>
  );
});

export default BinaryTable;
