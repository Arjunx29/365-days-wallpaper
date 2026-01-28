

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import WallpaperApp from "./WallpaperApp";
import Goals from "./Goals";
import HeaderBar from "./HeaderBar";
import TimerPanel from "./TimerPanel";
import WhyPanel from "./WhyPanel";


const Dashboard = () => {
  

  return (
    <div className="dashboard-wrapper">

      <HeaderBar />
    
      <div className="dashboard-container">
        <div className="left-column">
          <WallpaperApp />
        </div>

<div className="right-side-wrapper">
  <div className="right-column">
    <WhyPanel />
  </div>

  <div className="right-column">
    <TimerPanel />
  </div>
</div>

          <div className="center-column">
          <Goals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
