import React, { useCallback } from "react";
import Header from "../Header";
import Particles from "react-tsparticles";
import Home from "../Home";
import { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="AppLayout">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
