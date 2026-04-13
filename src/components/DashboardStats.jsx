import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './DashboardStats.css';

export default function DashboardStats() {
  const [data, setData] = useState({ total: 0, open: 0, resolved: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/tickets/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setData(await response.json());
        }
      } catch (err) {
        console.error("Error fetching global stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Tickets', value: data.total, trend: "↗", icon: Ticket, color: '#3b82f6', trendUp: true },
    { label: 'Open Tickets', value: data.open, trend: "↘", icon: AlertCircle, color: '#f59e0b', trendUp: false },
    { label: 'Resolved', value: data.resolved, trend: "↗", icon: CheckCircle, color: '#10b981', trendUp: true },
    { label: 'In Progress', value: data.inProgress, trend: "↗", icon: Clock, color: '#6366f1', trendUp: true },
  ];

  if (loading) return <div className="stats-grid">Loading...</div>;

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div className="stat-card-new" key={index}>
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className={`stat-trend ${stat.trendUp ? 'up' : 'down'}`}>
              {stat.trend}
            </div>
          </div>
          <div className="stat-card-body">
            <span className="stat-label-new">{stat.label}</span>
            <span className="stat-value-new">{stat.value.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
