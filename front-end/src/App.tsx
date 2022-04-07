import React, { useState } from "react";
import logo from "./logo.svg";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./App.css";
import { ToolBarWidget } from "./widgets/ToolBar/index";
import Table from "./widgets/Table/table";
import { Layout } from "./components/index";
import { useAppServiceProvider } from "./custom.hooks/socket.hook";

type status = "error" | "success";

function App() {
  const [showSnackBar, setShowNackBar] = useState({
    status: "error",
    show: false,
  });

  const $showSnackBar = (status: status) => {
    setShowNackBar({ status, show: true });
  };
  const [Rates, History, saveHistory] = useAppServiceProvider($showSnackBar);

  return (
    <Layout.Container>
      <ToolBarWidget
        rates={Rates}
        onExchange={(params) => saveHistory(params)}
      />
      <Layout.ContainerSeperator />
      <Table history={History} />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={showSnackBar.show}
        autoHideDuration={5000}
        onClose={() => setShowNackBar({ show: false, status: "" })}
      >
        <Alert
          variant="filled"
          severity={showSnackBar.status as any}
          sx={{ width: "100%" }}
        >
          {showSnackBar.status === "error"
            ? "Could not complete exchange"
            : "Exchanged Saved successfully!!"}
        </Alert>
      </Snackbar>
    </Layout.Container>
  );
}

export default App;
