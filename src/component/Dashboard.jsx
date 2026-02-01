

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import WallpaperApp from "./WallpaperApp";
import Goals from "./Goals";
import HeaderBar from "./HeaderBar";
import TimerPanel from "./TimerPanel";
import WhyPanel from "./WhyPanel";
import PendingTasks from "./PendingTasks";
import ReviewPanel from "./ReviewPanel";
import AffirmationPanel from "./AffirmationPanel";


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

          <div className="center-column">
            <Goals />
          </div>
          <div>  <ReviewPanel /></div>
        </div>
        <div className="right-side-wrapper">
          <div className="right-column">
          <TimerPanel />
        </div>
        <div className="right-column">
          <PendingTasks />
        </div>
        <div className="right-column">
          <AffirmationPanel />
        </div>
        </div>
        
       

      </div>
    </div>
  );
};

export default Dashboard;
