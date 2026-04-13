import React, { useState, useEffect } from 'react'
import API_URL from '../config/apiConfig';
import { TrendingUp, TrendingDown, Users, BarChart3, PieChart, Activity } from 'lucide-react'
import "./ReportCard.css"

const AVATAR_BG = '#e0e7ff';
const AVATAR_TEXT = '#4f46e5';


export default function ReportCard() {
    const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, inProgress: 0, assigned: 0 });
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [statsRes, agentsRes] = await Promise.all([
                    fetch(`${API_URL}/tickets/stats`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${API_URL}/auth/top-agents`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (agentsRes.ok) setAgents(await agentsRes.json());
            } catch (err) {
                console.error("Error fetching report data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, []);

    const getInitials = (name) => {
        if (!name) return 'A';
        return name.trim().charAt(0).toUpperCase();
    };

    const statusItems = [
        { label: 'Resolved', count: stats.resolved, color: '#22c55e' },
        { label: 'In Progress', count: stats.inProgress, color: '#3b82f6' },
        { label: 'Assigned', count: stats.assigned, color: '#f59e0b' },
        { label: 'Open', count: stats.open, color: '#ef4444' },
    ];

    if (loading) return <div className="reports-container-wrapper">Loading...</div>;

    return (
        <div className="reports-container-wrapper">
            {/* Visualizations Section */}
            <div className="reports-grid-section">
                {/* Status Distribution */}
                <div className="report-widget">
                    <div className="widget-header">
                        <h3 className="widget-title">Ticket Status Distribution</h3>
                        <PieChart size={16} className="tc-filter-icon" />
                    </div>
                    <div className="status-dist-list">
                        {statusItems.map((item, idx) => (
                            <div key={idx} className="status-dist-item">
                                <div className="dist-label-row">
                                    <span className="dist-label">{item.label}</span>
                                    <span className="dist-count">{item.count}</span>
                                </div>
                                <div className="dist-bar-bg">
                                    <div
                                        className="dist-bar-fill"
                                        style={{
                                            width: `${(item.count / (stats.total || 1) * 100).toFixed(1)}%`,
                                            backgroundColor: item.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="report-widget">
                    <div className="widget-header">
                        <h3 className="widget-title">Agent Efficiency</h3>
                        <Activity size={16} className="tc-filter-icon" />
                    </div>
                    <table className="team-perf-table">
                        <thead>
                            <tr>
                                <th>Agent</th>
                                <th>Resolved</th>
                                <th>Avg. Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map((agent) => (
                                <tr key={agent.id}>
                                    <td>
                                        <div className="agent-profile">
                                            <div
                                                className="agent-mini-avatar-initials"
                                                style={{ backgroundColor: AVATAR_BG, color: AVATAR_TEXT }}
                                            >
                                                {getInitials(agent.name)}
                                            </div>
                                            <span className="agent-name-small">{agent.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="perf-value">{agent.resolved}</span></td>
                                    <td><span className="perf-value">1h 20m</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
