import React from "react";
import { Search, Bell } from "lucide-react";
import "./Header.css";

export default function Header({ title }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-breadcrumb">{title.toUpperCase()}</span>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tickets, customers, or IDs..."
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        <div className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </div>
        <div className="navbar-divider"></div>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{localStorage.getItem('userName')}</span>
            <span className="user-role">{localStorage.getItem('role')}</span>
          </div>
          <div className="user-avatar">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(localStorage.getItem('userName'))}&background=0D8ABC&color=fff`} alt="User Avatar" />
            <span className="status-indicator"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
