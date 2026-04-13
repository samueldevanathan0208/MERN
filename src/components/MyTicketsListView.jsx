import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import { Search, Filter } from 'lucide-react';
import TicketTable from './TicketTable';
import './MyTicketsListView.css';

export default function MyTicketsListView({ filterType }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const userName = localStorage.getItem('userName');

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tickets?agent=${encodeURIComponent(userName)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch tickets');
            const data = await response.json();

            const mapped = data.map(t => ({
                id: t._id,
                subject: t.subject || 'No Subject',
                status: t.status || 'Open',
                priority: t.priority || 'Low',
                date: new Date(t.createdAt).toLocaleDateString(),
                customer: t.customerEmail || 'Unknown'
            }));
            setTickets(mapped);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [userName]);

    const title = filterType === 'assigned' ? 'Assigned Tickets' : filterType === 'resolved' ? 'Resolved Tickets' : 'My Tickets';

    let filteredTickets = tickets;
    if (filterType === 'my') {
        filteredTickets = tickets.filter(t => t.status === 'In Progress');
    } else if (filterType === 'assigned') {
        filteredTickets = tickets.filter(t => t.status === 'Assigned');
    } else if (filterType === 'resolved') {
        filteredTickets = tickets.filter(t => t.status === 'Resolved');
    }

    const displayTickets = filteredTickets.filter(ticket => {
        const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="agent-page">
            <div className="agent-dashboard-header">
                <h2>{title}</h2>
                <p className="subtitle">Manage and respond to your tickets efficiently.</p>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <div className="filter-select-wrapper">
                        <Filter size={16} className="filter-icon" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <div className="filter-select-wrapper">
                        <Filter size={16} className="filter-icon" />
                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="All">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="dashboard-section table-section">
                {loading ? (
                    <p>Loading your tickets...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : (
                    <TicketTable
                        tickets={displayTickets}
                        onStatusUpdate={fetchTickets}
                    />
                )}
            </div>
        </div>
    );
}
