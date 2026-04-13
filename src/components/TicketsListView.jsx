import React, { useState, useMemo, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import './TicketsListView.css';
import { Filter, UserCheck, AlertCircle, Clock, User, X } from 'lucide-react';

const STATUS_COLORS = {
    Open: { bg: '#fff1f0', color: '#cf1322' },
    Assigned: { bg: '#e6f7ff', color: '#0958d9' },
    Closed: { bg: '#f6ffed', color: '#389e0d' },
};

const PRIORITY_COLORS = {
    Low: { dot: '#95de64', label: '#389e0d' },
    Medium: { dot: '#ffa940', label: '#d46b08' },
    High: { dot: '#ff4d4f', label: '#cf1322' },
    Urgent: { dot: '#722ed1', label: '#531dab' },
};

const AVATAR_BG = '#e0e7ff';
const AVATAR_TEXT = '#4f46e5';

function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/[\s._-]+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}

function StatusBadge({ status }) {
    const s = STATUS_COLORS[status] || { bg: '#f5f5f5', color: '#595959' };
    return (
        <span className="tc-status-badge" style={{ background: s.bg, color: s.color }}>
            {status}
        </span>
    );
}

function PriorityBadge({ priority }) {
    const p = PRIORITY_COLORS[priority] || { dot: '#d9d9d9', label: '#595959' };
    return (
        <span className="tc-priority-badge">
            <span className="tc-priority-dot" style={{ background: p.dot }} />
            <span style={{ color: p.label }}>{priority}</span>
        </span>
    );
}

export default function TicketsListView() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Open');
    const [priorityFilter, setPriorityFilter] = useState('Any');
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingAgents, setPendingAgents] = useState({});
    const [fetchedAgents, setFetchedAgents] = useState([]);

    const [syncing, setSyncing] = useState(false);

    const syncTicketsFromEmail = async () => {
        setSyncing(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tickets/sync`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                // Refresh the ticket list after sync
                await fetchTickets();
            }
        } catch (err) {
            console.error("Sync Error:", err);
        } finally {
            setSyncing(false);
        }
    };

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tickets`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Map backend data to frontend format
            const mappedTickets = data.map(t => {
                return {
                    id: t._id,
                    subject: t.subject || 'No Subject',
                    status: t.status || 'Open',
                    priority: t.priority || 'Low',
                    agent: t.assignedTo || null,
                    requester: t.customerEmail?.split('@')[0] || 'Unknown',
                    company: 'Customer',
                    responseTime: 'Just now',
                    resolutionInfo: t.status === 'Open' ? 'Resolution due soon' : 'Resolved',
                    overdue: false,
                    date: new Date(t.createdAt).toLocaleDateString(),
                };
            });

            setTickets(mappedTickets);
            setError(null);
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await syncTicketsFromEmail(); // Initial sync on load
            await fetchAgents();
        };
        init();
    }, []);

    const filtered = useMemo(() => {
        return tickets.filter(t => {
            const matchStatus = statusFilter === 'All' ? t.status === 'Open' : t.status === statusFilter;
            const matchPriority = priorityFilter === 'Any' || t.priority === priorityFilter;
            const matchSearch = !searchQuery ||
                t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(t.id).includes(searchQuery);
            return matchStatus && matchPriority && matchSearch;
        });
    }, [tickets, statusFilter, priorityFilter, searchQuery]);

    const setPendingAgent = (ticketId, agentName) => {
        setPendingAgents(prev => ({ ...prev, [ticketId]: agentName }));
    };

    const assignTicket = async (ticketId) => {
        const agentName = pendingAgents[ticketId];
        if (!agentName) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    assignedTo: agentName,
                    status: 'Assigned'
                })
            });

            if (!response.ok) throw new Error('Failed to assign ticket');

            setTickets(prev => prev.filter(t => t.id !== ticketId));
            setPendingAgents(prev => { const n = { ...prev }; delete n[ticketId]; return n; });
        } catch (err) {
            console.error("Error assigning ticket:", err);
            alert("Failed to assign ticket: " + err.message);
        }
    };

    const resetFilters = () => {
        setStatusFilter('All');
        setPriorityFilter('Any');
        setSearchQuery('');
    };

    return (
        <div className="tc-page">
            <div className="tc-topbar">
                <h1 className="tc-title">All Tickets</h1>
                <button
                    className={`tc-reset-btn ${syncing ? 'syncing' : ''}`}
                    onClick={syncTicketsFromEmail}
                    disabled={syncing}
                    style={{ marginLeft: 'auto', padding: '6px 12px' }}
                >
                    <Clock size={14} /> {syncing ? 'Syncing...' : 'Sync Emails'}
                </button>
            </div>

            <div className="tc-filterbar">
                <div className="tc-filterbar-left">
                    <input
                        className="tc-search"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <div className="tc-filter-group">
                        <Filter size={13} className="tc-filter-icon" />
                        <span className="tc-filter-label">Status:</span>
                        <select className="tc-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Open">Open</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="tc-filter-group">
                        <span className="tc-filter-label">Priority:</span>
                        <select className="tc-filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                            <option value="Any">Any</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <button className="tc-reset-btn" onClick={resetFilters}>
                        <X size={12} /> Reset
                    </button>
                </div>
                <span className="tc-count">Showing <b>{filtered.length}</b> ticket{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="tc-list">
                <div className="tc-list-header">
                    <span>Subject</span>
                    <span>Status</span>
                    <span>Priority</span>
                    <span>Assign Agent</span>
                    <span>Action</span>
                </div>

                {loading ? (
                    <div className="tc-empty">
                        <p>Loading tickets...</p>
                    </div>
                ) : error ? (
                    <div className="tc-empty">
                        <AlertCircle size={28} className="tc-empty-icon" style={{ color: '#cf1322' }} />
                        <p style={{ color: '#cf1322' }}>Error: {error}</p>
                        <p>Make sure the backend server (port 4000) is running.</p>
                        <button className="tc-reset-btn" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="tc-empty">
                        <AlertCircle size={28} className="tc-empty-icon" />
                        <p>No tickets match your filters.</p>
                        <button className="tc-reset-btn" onClick={resetFilters}>Clear Filters</button>
                    </div>
                ) : null}

                {!loading && !error && filtered.map(ticket => (
                    <div key={ticket.id} className={`tc-row ${ticket.overdue ? 'overdue' : ''}`}>
                        <div className="tc-col-subject">
                            <div
                                className="tc-row-initials"
                                style={{ backgroundColor: AVATAR_BG, color: AVATAR_TEXT }}
                            >
                                {getInitials(ticket.requester || 'Unknown')}
                            </div>
                            <div>
                                <div className="tc-subject-line">
                                    <span className="tc-subject-text">{ticket.subject}</span>
                                    <span className="tc-ticket-id">#{ticket.id}</span>
                                </div>
                                <div className="tc-meta-line">
                                    <span className="tc-requester">{ticket.requester}</span>
                                    <span className="tc-company">({ticket.company})</span>
                                    {ticket.overdue
                                        ? <span className="tc-overdue-tag"><AlertCircle size={10} /> {ticket.resolutionInfo}</span>
                                        : <span className="tc-sla-ok"><Clock size={10} /> {ticket.resolutionInfo}</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="tc-col-status">
                            <StatusBadge status={ticket.status} />
                        </div>

                        <div className="tc-col-priority">
                            <PriorityBadge priority={ticket.priority} />
                        </div>

                        <div className="tc-col-agent">
                            {(pendingAgents[ticket.id] || ticket.agent)
                                ? <div
                                    className="tc-row-initials"
                                    style={{
                                        backgroundColor: AVATAR_BG,
                                        color: AVATAR_TEXT,
                                        width: '24px',
                                        height: '24px',
                                        fontSize: '10px'
                                    }}
                                >
                                    {getInitials(pendingAgents[ticket.id] || ticket.agent)}
                                </div>
                                : <span className="tc-unassigned-icon"><User size={13} /></span>
                            }
                            <select
                                className="tc-agent-select"
                                value={pendingAgents[ticket.id] ?? (ticket.agent || '')}
                                onChange={e => setPendingAgent(ticket.id, e.target.value)}
                            >
                                <option value="">Unassigned</option>
                                {fetchedAgents.map(a => (
                                    <option key={a._id} value={a.name}>{a.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="tc-col-action">
                            {(() => {
                                const pending = pendingAgents[ticket.id];
                                const alreadyAssigned = ticket.status === 'Assigned' && !pending;
                                const canAssign = !!pending && pending !== ticket.agent;
                                return (
                                    <button
                                        className={`tc-action-btn assign ${alreadyAssigned ? 'done' : ''}`}
                                        onClick={() => assignTicket(ticket.id)}
                                        disabled={!canAssign}
                                    >
                                        <UserCheck size={13} />
                                        {alreadyAssigned ? 'Assigned' : 'Assign'}
                                    </button>
                                );
                            })()}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length > 0 && (
                <div className="tc-end">
                    <div className="tc-end-icon">◎</div>
                    <p className="tc-end-title">End of queue reached</p>
                    <p className="tc-end-sub">You've cleared all current active tickets.</p>
                </div>
            )}
        </div>
    );
}
