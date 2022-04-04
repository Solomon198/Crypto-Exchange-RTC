import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToolBarWidget } from "./widgets/ToolBar/index";
import Table from "./widgets/Table/table";
import { Layout } from "./components/index";

function App() {
  return (
    <Layout.Container>
      <ToolBarWidget />
      <Layout.ContainerSeperator />
      <Table />
    </Layout.Container>
  );
}

export default App;
