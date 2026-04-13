import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import './TopAgents.css';
import { useNavigate } from 'react-router-dom';

export default function TopAgents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/top-agents`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setAgents(await response.json());
        }
      } catch (err) {
        console.error("Error fetching top agents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopAgents();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.trim().charAt(0).toUpperCase();
  };

  if (loading) return <div className="top-agents-card">Loading...</div>;

  return (
    <div className="top-agents-card">
      <div className="agents-header">
        <h3>Top Agents</h3>
        <p>Based on total resolved tickets</p>
      </div>
      <div className="agents-list">
        {agents.map((agent) => (
          <div className="agent-item" key={agent.id}>
            <div className="agent-rank-avatar">
              <div className="rank-badge">{agent.rank}</div>
              <div className="avatar-initials-agent">
                {getInitials(agent.name)}
              </div>
            </div>
            <div className="agent-main-info">
              <span className="agent-name-bold">{agent.name}</span>
              <span className="agent-stats">{agent.resolved} resolved</span>
            </div>
          </div>
        ))}
      </div>
      <button className="performance-reports-btn" onClick={() => navigate('/reports')}>View Performance Reports</button>
    </div>
  );
}
