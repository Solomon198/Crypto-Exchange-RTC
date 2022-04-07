import HistoryTableDesktop from "../Table/desktop/index";
import HistoryTableMobile from "../Table/mobile/index";
import { Typography } from "../../components/index";
import { DateFilter } from "./filters/date.filter";
import { History, Filter } from "../../types/entities";

interface Props {
  history: History[];
  onFilter: (payload: Filter) => void;
}
export default function TableWidget(props: Props) {
  const history = props.history;
  return (
    <>
      <Typography.H6>History</Typography.H6>
      <DateFilter onFilter={(payload) => props.onFilter(payload)} />
      <HistoryTableDesktop data={history} />
      <HistoryTableMobile data={history} />
    </>
  );
}
