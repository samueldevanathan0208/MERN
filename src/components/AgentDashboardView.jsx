import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import { Ticket, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import './AgentDashboardView.css';

export default function AgentDashboardView() {
    const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, inProgress: 0 });
    const [recentTickets, setRecentTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const agentName = localStorage.getItem('userName') || 'Agent';

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [statsRes, ticketsRes] = await Promise.all([
                fetch(`${API_URL}/tickets/stats?agent=${encodeURIComponent(agentName)}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${API_URL}/tickets?agent=${encodeURIComponent(agentName)}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (ticketsRes.ok) {
                const tickets = await ticketsRes.json();
                setRecentTickets(tickets.slice(0, 5)); // Show top 5
            }
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [agentName]);

    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchData(); // Refresh all
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress': return 'status-badge in-progress';
            case 'Resolved': return 'status-badge resolved';
            case 'Assigned': return 'status-badge assigned';
            default: return 'status-badge';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Critical': return 'priority-badge critical';
            case 'High': return 'priority-badge high';
            case 'Medium': return 'priority-badge medium';
            default: return 'priority-badge low';
        }
    };

    return (
        <div className="agent-page">
            <div className="agent-dashboard-header">
                <h2>Welcome, {agentName}</h2>
                <p className="subtitle">Here's your workload overview for today.</p>
            </div>

            <div className="stat-cards-grid">
                <div className="stat-card">
                    <div className="stat-card-icon assigned-icon">
                        <Ticket size={24} />
                    </div>
                    <div className="stat-card-info">
                        <p className="stat-title">Total Tickets</p>
                        <h3 className="stat-value">{stats.total}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon pending-icon">
                        <AlertCircle size={24} />
                    </div>
                    <div className="stat-card-info">
                        <p className="stat-title">Open Tickets</p>
                        <h3 className="stat-value">{stats.open}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon resolved-icon">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stat-card-info">
                        <p className="stat-title">Resolved</p>
                        <h3 className="stat-value">{stats.resolved}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon in-progress-icon">
                        <Clock size={24} />
                    </div>
                    <div className="stat-card-info">
                        <p className="stat-title">In Progress</p>
                        <h3 className="stat-value">{stats.inProgress}</h3>
                    </div>
                </div>
            </div>

            <div className="dashboard-main-grid">
                <div className="dashboard-section recent-tickets">
                    <div className="section-header">
                        <h3>Recent Activity</h3>
                        <button className="view-all-btn">View All</button>
                    </div>
                    <div className="ticket-list">
                        {recentTickets.map(ticket => {
                            return (
                                <div key={ticket._id} className="ticket-item">
                                    <div className="ticket-item-main">
                                        <div className="ticket-id">#{ticket._id.slice(-6)}</div>
                                        <div className="ticket-subject">{ticket.subject}</div>
                                    </div>
                                    <div className="ticket-meta">
                                        <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
                                        <span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span>
                                        <select
                                            className="status-action-select"
                                            value={ticket.status}
                                            onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Assigned">Assigned</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="dashboard-section priority-chart">
                    <div className="section-header">
                        <h3>Workload by Priority</h3>
                        <button className="icon-btn"><TrendingUp size={18} /></button>
                    </div>
                    <div className="chart-container">
                        <div className="chart-bar-group">
                            <div className="chart-label">
                                <span>Critical</span>
                                <span>{recentTickets.filter(t => t.priority === 'Critical').length}</span>
                            </div>
                            <div className="chart-bar-bg">
                                <div className="chart-bar-fill critical-fill" style={{ width: `${(recentTickets.filter(t => t.priority === 'Critical').length / (recentTickets.length || 1)) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="chart-bar-group">
                            <div className="chart-label">
                                <span>High</span>
                                <span>{recentTickets.filter(t => t.priority === 'High').length}</span>
                            </div>
                            <div className="chart-bar-bg">
                                <div className="chart-bar-fill high-fill" style={{ width: `${(recentTickets.filter(t => t.priority === 'High').length / (recentTickets.length || 1)) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="chart-bar-group">
                            <div className="chart-label">
                                <span>Medium</span>
                                <span>{recentTickets.filter(t => t.priority === 'Medium').length}</span>
                            </div>
                            <div className="chart-bar-bg">
                                <div className="chart-bar-fill medium-fill" style={{ width: `${(recentTickets.filter(t => t.priority === 'Medium').length / (recentTickets.length || 1)) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="chart-bar-group">
                            <div className="chart-label">
                                <span>Low</span>
                                <span>{recentTickets.filter(t => t.priority === 'Low').length}</span>
                            </div>
                            <div className="chart-bar-bg">
                                <div className="chart-bar-fill low-fill" style={{ width: `${(recentTickets.filter(t => t.priority === 'Low').length / (recentTickets.length || 1)) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
