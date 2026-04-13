import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import './RecentActivity.css';

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/tickets`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const tickets = await response.json();
          setActivities(tickets.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching recent activity:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'Assigned': return 'info';
      case 'In Progress': return 'neutral';
      case 'Open': return 'info';
      default: return 'neutral';
    }
  };

  const getActionText = (status) => {
    switch (status) {
      case 'Resolved': return 'resolved ticket';
      case 'Assigned': return 'was assigned to';
      case 'In Progress': return 'started working on';
      case 'Open': return 'created a new ticket';
      default: return 'updated ticket';
    }
  };

  if (loading) return <div className="activity-card">Loading...</div>;

  return (
    <div className="activity-card">
      <div className="activity-header">
        <div>
          <h3>Recent Activity</h3>
          <p>Latest actions taken by your team</p>
        </div>
        <button className="view-all-btn">View All Activity</button>
      </div>
      <div className="activity-list">
        {activities.map((item) => (
          <div className="activity-item" key={item._id}>
            <div className="activity-user">
              <div className="avatar-initials-small">
                {getInitials(item.assignedTo || item.customerEmail)}
              </div>
              <div className="activity-info">
                <p>
                  <span className="user-name-bold">{item.assignedTo || 'System'}</span>
                  {" "}{getActionText(item.status)}{" "}
                  <span className="ticket-id">#{item._id.slice(-6)}</span>
                  {" - "}{item.subject}
                </p>
                <span className="activity-time">
                  {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className={`activity-status-badge ${getStatusClass(item.status)}`}>
              {item.status.toLowerCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
