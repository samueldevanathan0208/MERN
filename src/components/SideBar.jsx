import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutGrid, Ticket, Users, BarChart2, Settings, UserCheck, CheckCircle, User, LogOut } from 'lucide-react'
import logo from '../assets/logo.png'
import "../App.css"


export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  return (

    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="sidebar-links">
        {role === "admin" ? (
          <>
            <Link to="/dashboard" title="Dashboard">
              <button className={`sidebar-btn ${location.pathname === "/dashboard" ? "active" : ""}`}>
                <LayoutGrid size={24} />
              </button>
            </Link>
            <Link to="/tickets" title="Tickets">
              <button className={`sidebar-btn ${location.pathname === "/tickets" ? "active" : ""}`}>
                <Ticket size={24} />
              </button>
            </Link>
            <Link to="/customers" title="Customers">
              <button className={`sidebar-btn ${location.pathname === "/customers" ? "active" : ""}`}>
                <Users size={24} />
              </button>
            </Link>
            <Link to="/reports" title="Reports">
              <button className={`sidebar-btn ${location.pathname === "/reports" ? "active" : ""}`}>
                <BarChart2 size={24} />
              </button>
            </Link>
            <Link to="/settings" title="Settings">
              <button className={`sidebar-btn ${location.pathname === "/settings" ? "active" : ""}`}>
                <Settings size={24} />
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/agent/dashboard" title="Agent Dashboard">
              <button className={`sidebar-btn ${location.pathname === "/agent/dashboard" ? "active" : ""}`}>
                <LayoutGrid size={24} />
              </button>
            </Link>
            <Link to="/agent/my-tickets" title="My Tickets">
              <button className={`sidebar-btn ${location.pathname === "/agent/my-tickets" ? "active" : ""}`}>
                <Ticket size={24} />
              </button>
            </Link>
            <Link to="/agent/assigned-tickets" title="Assigned Tickets">
              <button className={`sidebar-btn ${location.pathname === "/agent/assigned-tickets" ? "active" : ""}`}>
                <UserCheck size={24} />
              </button>
            </Link>
            <Link to="/agent/resolved-tickets" title="Resolved Tickets">
              <button className={`sidebar-btn ${location.pathname === "/agent/resolved-tickets" ? "active" : ""}`}>
                <CheckCircle size={24} />
              </button>
            </Link>
            <Link to="/agent/profile" title="Profile">
              <button className={`sidebar-btn ${location.pathname === "/agent/profile" ? "active" : ""}`}>
                <User size={24} />
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="sidebar-bottom">
        <button
          className="sidebar-btn logout-sidebar-btn"
          title="Logout"
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          <LogOut size={24} />
        </button>
      </div>
    </aside>

  )
}
