import React from "react";
import "./AdminDashboardView.css"
import DashboardStats from "./DashboardStats";
import RecentActivity from "./RecentActivity";
import TopAgents from "./TopAgents";
import { Plus } from "lucide-react";

export default function AdminDashboardView() {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header-section">
                <div className="greeting-container">
                    <h2 className="dashboard-title">Dashboard</h2>
                    <p className="dashboard-subtitle">Welcome back. Here's what's happening with your support queue today.</p>
                </div>
                <div className="header-actions">
                    <button className="new-ticket-btn">
                        <Plus size={18} />
                        New Ticket
                    </button>
                </div>
            </div>

            <main className="dashboard-content">
                <DashboardStats />

                <div className="dashboard-main-grid">
                    <RecentActivity />
                    <TopAgents />
                </div>
            </main>
        </div>
    );
}
