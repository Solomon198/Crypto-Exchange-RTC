import BootstrapTable from "react-bootstrap-table-next";
import { Paper } from "@mui/material";
import { ExchangeTypeColumnFormatter } from "./table.formatters/column";
import { History } from "../../../types/entities";
import "./style.css";

interface Props {
  data: History[];
}

export default function HistoryTableDesktop(props: Props) {
  const columns = [
    {
      dataField: "date",
      text: "Date & Time",
      sort: true,
      headerSortingClasses: "sortable-active",
    },
    {
      dataField: "currencyFromShortName",
      text: "Currency From",
      sort: true,
    },
    {
      dataField: "amountFrom",
      text: "Amount 1",
      sort: true,
    },
    {
      dataField: "currencyTo",
      text: "Currency To",
      sort: true,
    },
    {
      dataField: "amountTo",
      text: "Amount 2",
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      formatter: ExchangeTypeColumnFormatter,
    },
  ];

  return (
    <Paper
      elevation={0}
      style={{ marginTop: 20 }}
      sx={{ display: { md: "block", xs: "none", sm: "none" } }}
    >
      <BootstrapTable
        keyField="_id"
        data={props.data}
        columns={columns}
        bootstrap4
        classes=""
      />
    </Paper>
  );
}
