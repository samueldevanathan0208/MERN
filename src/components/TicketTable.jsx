import React, { useState } from 'react';
import API_URL from '../config/apiConfig';

export default function TicketTable({ tickets, onStatusUpdate }) {
  const [localStatuses, setLocalStatuses] = useState({});

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

      if (!response.ok) throw new Error('Failed to update status');

      setLocalStatuses(prev => ({ ...prev, [ticketId]: newStatus }));

      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status: " + err.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Progress': return 'status-badge in-progress';
      case 'Resolved': return 'status-badge resolved';
      case 'Assigned': return 'status-badge assigned';
      case 'Closed': return 'status-badge';
      case 'Open': return 'status-badge open';
      default: return 'status-badge';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'priority-badge critical';
      case 'High': return 'priority-badge high';
      case 'Medium': return 'priority-badge medium';
      case 'Low': return 'priority-badge low';
      default: return 'priority-badge';
    }
  };

  return (
    <div className="table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => {
            const currentStatus = localStatuses[ticket.id] || ticket.status;
            return (
              <tr key={index}>
                <td className="ticket-id-cell">#{ticket.id.slice(-8)}</td>
                <td className="ticket-subject-cell">{ticket.subject}</td>
                <td><span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span></td>
                <td><span className={getStatusClass(currentStatus)}>{currentStatus}</span></td>
                <td className="ticket-customer-cell">
                  <div className="customer-info">
                    <div className="customer-avatar">{ticket.customer.charAt(0)}</div>
                    <span>{ticket.customer}</span>
                  </div>
                </td>
                <td className="ticket-date-cell">{ticket.date}</td>
                <td>
                  <select
                    className="status-action-select"
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            );
          })}
          {tickets.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-table-state">No tickets found matching the current filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
