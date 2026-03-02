import React from 'react';
import './CustomerTable.css';
import { MoreVertical } from 'lucide-react';
import { customerList } from '../config/customerList';
import Image from '../assets/s.jpeg'; // Reusing the existing image for demo

function CustomerTable() {
    return (
        <div className="customer-table-container">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th className="th-checkbox"><input type="checkbox" /></th>
                        <th>Contact</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Email address</th>
                        <th>Mobile phone</th>
                        <th>Work phone</th>
                        <th>Social Handle</th>
                        <th className="th-actions"></th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => (
                        <tr key={customer.id}>
                            <td><input type="checkbox" className="row-checkbox" /></td>
                            <td>
                                <div className="contact-cell">
                                    <img src={customer.avatar || Image} alt={customer.name} className="customer-avatar" />
                                    <span className="customer-name">{customer.name}</span>
                                </div>
                            </td>
                            <td>{customer.title}</td>
                            <td>{customer.company}</td>
                            <td>{customer.email}</td>
                            <td className="muted-text">{customer.mobilePhone}</td>
                            <td>{customer.workPhone}</td>
                            <td className="muted-text">{customer.socialHandle}</td>
                            <td>
                                <button className="action-btn">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;