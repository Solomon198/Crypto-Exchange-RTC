import { io } from "socket.io-client";
import moment from "moment";
import { useEffect, useState } from "react";
import { Rates, History } from "../types/entities";

export function useAppServiceProvider(): [
  Rates[],
  History[],
  (param: History) => void
];
export function useAppServiceProvider() {
  const [rates, setRate] = useState([] as Rates[]);
  const [history, setHistory] = useState([] as History[]);

  const Connection = io("ws://localhost:8081");

  const saveHistory = (payload: History) => {
    Connection.volatile.emit("save:history", payload);
  };

  useEffect(() => {
    Connection.on("connect", () => {
      Connection.volatile.emit("get:rate");
      Connection.volatile.emit("get:history");

      // gets live Rate and set on state;
      Connection.on("live:rate", (payload: Rates[]) => {
        setRate(payload);
      });

      Connection.on("live:history", (payload: History[]) => {
        const formatData = payload.map((history) => ({
          ...history,
          date: moment(history.date).format("DD/MM/YYYY HH:mm"),
        }));
        setHistory(formatData);
      });
    });

    return () => {
      // close socket connection when component umounts
      Connection.close();
    };
  }, []);

  return [rates, history, saveHistory];
}
