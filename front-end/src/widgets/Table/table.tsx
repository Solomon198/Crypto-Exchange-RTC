import HistoryTableDesktop from "../Table/desktop/index";
import HistoryTableMobile from "../Table/mobile/index";
import { Typography } from "../../components/index";
import { DateFilter } from "./filters/date.filter";
import { History } from "../../types/entities";

interface Props {
  history: History[];
}
export default function TableWidget(props: Props) {
  const history = props.history;
  return (
    <>
      <Typography.H6>History</Typography.H6>
      <DateFilter />
      <HistoryTableDesktop data={history} />
      <HistoryTableMobile data={history} />
    </>
  );
}
