import React from 'react';
import './CustomerTable.css';
import { Mail, Calendar, User } from 'lucide-react';

const STATUS_COLORS = {
    Active: { bg: '#f6ffed', color: '#389e0d', border: '#b7eb8f' },
    Inactive: { bg: '#fff1f0', color: '#cf1322', border: '#ffa39e' },
};

const AVATAR_BG = '#e0e7ff';
const AVATAR_TEXT = '#4f46e5';

function getInitials(name) {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
}

function StatusBadge({ status }) {
    const s = STATUS_COLORS[status] || { bg: '#f5f5f5', color: '#595959', border: '#d9d9d9' };
    return (
        <span className="customer-status-badge" style={{
            background: s.bg,
            color: s.color,
            borderColor: s.border
        }}>
            {status}
        </span>
    );
}

function CustomerTable({ customers }) {
    return (
        <div className="customer-list-card">
            <table className="customer-premium-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email Address</th>
                        <th>Created At</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index} className="customer-row">
                            <td>
                                <div className="customer-contact-info">
                                    <div
                                        className="customer-avatar-initials"
                                        style={{ backgroundColor: AVATAR_BG, color: AVATAR_TEXT }}
                                    >
                                        {getInitials(customer.name)}
                                    </div>
                                    <div className="name-stack">
                                        <span className="customer-name-bold">{customer.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="contact-methods">
                                    <div className="contact-item">
                                        <Mail size={12} className="contact-icon" />
                                        <span>{customer.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="time-info">
                                    <Calendar size={12} className="contact-icon" />
                                    <span className="last-contact-time">
                                        {new Date(customer.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <StatusBadge status={customer.status} />
                            </td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="5" className="tc-empty-state">No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;
