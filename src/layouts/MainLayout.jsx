import React from "react";
import {  Outlet, Link, useLocation } from "react-router-dom";
import { LayoutGrid, Ticket, Users, BarChart2, Settings, UserCheck, CheckCircle, User, LogOut } from "lucide-react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function MainLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("tickets") || path.includes("my-tickets") || path.includes("assigned-tickets") || path.includes("resolved-tickets") || path.includes("ticket/")) return "Tickets";
    if (path.includes("customers")) return "Customers";
    if (path.includes("reports")) return "Reports";
    if (path.includes("settings")) return "Settings";
    if (path.includes("profile")) return "Profile";
    return "Helpdesk";
  };

  return (
    <div className="app-container"> 
      <SideBar />    
     <main className="app-main">
        <Header title={getPageTitle()} />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
