import React from 'react'
import './Unresolved.css'

export default function UndeliveredCard() {
    return (
        <div className='unresolved-card'>
            <div className="card-header">
                <div className="header-left">
                    <h4>Undelivered emails</h4>
                    <p className="group-text">Across helpdesk</p>
                </div>
                <a href="#" className="view-details">View details</a>
            </div>
            <div className="card-body">
                <span className="empty-message">No undelivered emails</span>
            </div>
        </div>
    )
}
