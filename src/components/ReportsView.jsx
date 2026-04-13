import React from "react";
import { Calendar } from 'lucide-react';
import ReportCard from "./ReportCard";
import "./ReportsView.css";

export default function ReportsView() {
    return (
        <div className="tc-page">
            <div className="tc-topbar">
                <div className="tc-topbar-left">
                    <h1 className="tc-title">Reports & Analytics</h1>
                </div>
                <div className="tc-topbar-right">
                    <div className="tc-date-range">
                        <Calendar size={15} />
                        <span>Past 30 Days</span>
                    </div>
                </div>
            </div>

            <main className="reports-dashboard-content">
                <div className="reports-overview-section">
                    <ReportCard />
                </div>

                <div className="reports-grid-section">
                    {/* Secondary Report Widgets will be here */}
                </div>
            </main>
        </div>
    )
}
