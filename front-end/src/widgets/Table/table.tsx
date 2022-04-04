import HistoryTableDesktop from "../Table/desktop/index";
import HistoryTableMobile from "../Table/mobile/index";
import { Typography } from "../../components/index";
import { DateFilter } from "./filters/date.filter";
import History from "../../__mock__/history.json";

export default function TableWidget() {
  const history = History.history;
  return (
    <>
      <Typography.H6>History</Typography.H6>
      <DateFilter />
      <HistoryTableDesktop data={history} />
      <HistoryTableMobile data={history} />
    </>
  );
}
