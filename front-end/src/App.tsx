import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToolBarWidget } from "./widgets/ToolBar/index";
import Table from "./widgets/Table/table";
import { Layout } from "./components/index";
import { useAppServiceProvider } from "./custom.hooks/socket.hook";

function App() {
  const [Rates, History, saveHistory] = useAppServiceProvider();

  return (
    <Layout.Container>
      <ToolBarWidget
        rates={Rates}
        onExchange={(params) => saveHistory(params)}
      />
      <Layout.ContainerSeperator />
      <Table history={History} />
    </Layout.Container>
  );
}

export default App;
