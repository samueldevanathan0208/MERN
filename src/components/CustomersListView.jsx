import React, { useState, useEffect } from "react"
import API_URL from "../config/apiConfig";
import { Search } from 'lucide-react';
import CustomerTable from "./CustomerTable";
import "./CustomersListView.css";

export default function CustomersListView() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/tickets/customers`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    setCustomers(await response.json());
                }
            } catch (err) {
                console.error("Error fetching customers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="tc-page">
            <div className="tc-topbar">
                <div className="tc-topbar-left">
                    <h1 className="tc-title">Customers</h1>
                </div>
            </div>

            <div className="tc-filterbar">
                <div className="tc-filterbar-left">
                    <div className="tc-search-container">
                        <Search size={14} className="tc-search-icon" />
                        <input
                            className="tc-search"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '300px', paddingLeft: '32px' }}
                        />
                    </div>
                </div>
                <div className="tc-filterbar-right">
                    <span className="tc-count">
                        Showing <b>{filteredCustomers.length}</b> customer{filteredCustomers.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            <main className="customers-main-content">
                {loading ? (
                    <div className="tc-empty"><p>Loading customers...</p></div>
                ) : (
                    <CustomerTable customers={filteredCustomers} />
                )}
            </main>
        </div>
    )
}
