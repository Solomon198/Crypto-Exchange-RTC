import { Paper } from "@mui/material";
import {
  MobileCard,
  ExchangeIndicator,
  CardHeader,
  CardSubHeader,
} from "./styled.components";
import { History } from "../../../types/entities";

interface Props {
  data: History[];
}

export default function HistoryTableMobile(props: Props) {
  return (
    <Paper
      elevation={0}
      sx={{ display: { md: "none", xs: "block", sm: "block", marginTop: 20 } }}
    >
      {props.data.map(
        (
          {
            currencyFrom,
            currencyTo,
            amountFrom,
            currencyFromShortName,
            type,
            _id,
          },
          index
        ) => (
          <MobileCard key={_id}>
            <div className="flex-fill">
              <CardHeader
                style={{ fontWeight: 500, fontSize: 14 }}
              >{`${currencyFrom} --> ${currencyTo}`}</CardHeader>
              <CardSubHeader style={{ fontSize: 12 }}>
                Amount {`${currencyFromShortName} ${amountFrom}`}
              </CardSubHeader>
            </div>
            <ExchangeIndicator
              className={`${
                type === "Exchanged" ? "bg-primary" : "bg-success"
              }`}
            />
          </MobileCard>
        )
      )}
    </Paper>
  );
}
