import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LayoutGrid, Ticket, Users, BarChart2, Settings } from "lucide-react";
import logo from "../assets/logo.png";

function MainLayout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <Link to="/dashboard" title="Dashboard">
          <button className="sidebar-btn">
            <LayoutGrid size={24} />
          </button>
        </Link>
        <Link to="/tickects" title="Tickets">
          <button className="sidebar-btn">
            <Ticket size={24} />
          </button>
        </Link>
        <Link to="/customers" title="Customers">
          <button className="sidebar-btn">
            <Users size={24} />
          </button>
        </Link>
        <Link to="/report" title="Reports">
          <button className="sidebar-btn">
            <BarChart2 size={24} />
          </button>
        </Link>
        <Link to="/settings" title="Settings">
          <button className="sidebar-btn">
            <Settings size={24} />
          </button>
        </Link>
      </aside>
      <main className="app-main">
        
 
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
