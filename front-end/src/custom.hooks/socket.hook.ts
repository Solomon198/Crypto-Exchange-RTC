/**
 *  SOCKET MANAGER ------------ CUSTOM HOOK
 *  This file manages socket connection, it serves as the API between application and backend.
 *  All requests and request actions from UI are carried out here and data recieved from backend is passed
 *  to front end here
 */

import { io } from "socket.io-client";
import moment from "moment";
import { useEffect, useState } from "react";
import { Rates, History, Filter } from "../types/entities";

type status = "success" | "error";
type savedHistoryNotifier = (status: status) => void;

// connection to backend runing on port :8081
const Connection = io("ws://localhost:8081");

// useAppServiceProvider hook declaration
// the notifier is a function that is called from the component this hook will be used, it is fired whenever we recieve an event of a completed exchanged then we tell user transaction is submitted or successful
export function useAppServiceProvider(
  notifier: savedHistoryNotifier
): [Rates[], History[], (param: History) => void, (payload: Filter) => void];

// useAppServiceProvider hook definition
export function useAppServiceProvider(notifier: savedHistoryNotifier) {
  const [rates, setRate] = useState([] as Rates[]);
  const [history, setHistory] = useState([] as History[]);

  // function takes history and send request to save
  const saveHistory = (payload: History) => {
    Connection.volatile.emit("save:history", payload);
  };

  // gets History and pass in filter which contains date range and type
  const getHistory = (filter: Filter) => {
    Connection.volatile.emit("get:history", filter);
  };

  // is called whenever server emit that exchange is saved
  const savedNotification = (status: status) => {
    notifier(status);
  };

  useEffect(() => {
    Connection.on("connect", () => {
      Connection.volatile.emit("get:rate"); // get rate on connection
      Connection.volatile.emit("get:history"); // get history on connection

      // listens to live:rate event set on state which updates application with recent rate;
      Connection.on("live:rate", (payload: Rates[]) => {
        setRate(payload);
      });

      // listens and notify UI to show user exchange is succeful;
      Connection.on("saved:history", savedNotification);

      // listens to live:history event set on state which updates application with recent history;
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

  return [rates, history, saveHistory, getHistory]; // return information to calling component
}
