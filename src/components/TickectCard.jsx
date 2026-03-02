import React from 'react'
import './TickectCard.css'
import Image from '../assets/s.jpeg';
import { Mail, Clock, User, ChevronDown, CheckCircle2, History } from 'lucide-react';
import { ticketList } from '../config/TickectCard';

export default function TickectCard() {
    const ticketElements = ticketList.map((ticket) => {
        return (
            <div className="ticket-card-row" key={ticket.id}>
                <div className="card-left">
                    <input type="checkbox" className="ticket-checkbox" />
                    <div className="avatar-wrapper">
                        <img src={Image} alt="User Avatar" className="avatar-img" />
                        <span className="emoji-badge">😁</span>
                    </div>
                </div>

                <div className="card-middle">
                    <div className="status-badge-row">
                        <span className="overdue-badge">{ticket.status}</span>
                    </div>
                    <div className="title-row">
                        <h4 className="ticket-title">{ticket.label}</h4>
                        <span className="ticket-id">{ticket.ticketId}</span>
                    </div>
                    <div className="info-row">
                        <span className="requester-info">
                            <Mail className="info-icon" /> {ticket.requester}
                        </span>
                        <span className="separator">•</span>
                        <span className="response-time">
                            Agent responded {ticket.responseTime}
                        </span>
                        <span className="separator">•</span>
                        <span className="resolution-info">
                            <History className="info-icon" /> {ticket.resolutionInfo}
                        </span>
                    </div>
                </div>

                <div className="card-right">
                    <div className="control-item">
                        <span className="priority-indicator low"></span>
                        <select className="control-select" defaultValue={ticket.priority}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                        <ChevronDown className="control-arrow" />
                    </div>

                    <div className="control-item">
                        <User className="control-icon" />
                        <select className="control-select" defaultValue={ticket.agent}>
                            <option value={ticket.agent}>{ticket.agent}</option>
                            <option value="-- / Vivek...">-- / Vivek...</option>
                            <option value="-- / Sriraj...">-- / Sriraj...</option>
                        </select>
                        <ChevronDown className="control-arrow" />
                    </div>

                    <div className="control-item">
                        <CheckCircle2 className={`control-icon ${ticket.status === 'Open' ? 'status-open' : ''}`} />
                        <select className="control-select" defaultValue={ticket.status}>
                            <option value="Open">Open</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <ChevronDown className="control-arrow" />
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div>
            {ticketElements}
        </div>
    )
}
