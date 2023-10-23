import React from "react";
import "./style.scss";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
