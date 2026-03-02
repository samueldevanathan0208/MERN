import React from 'react'
import './Unresolved.css'

export default function UnresolvedCard() {
    return (
        <div className='unresolved-card'>
            <div className="card-header">
                <div className="header-left">
                    <h4>Unresolved tickets</h4>
                    <p className="group-text">Group: <span>Phone</span></p>
                </div>
                <a href="#" className="view-details">View details</a>
            </div>
            <div className="card-body">
                <span className="empty-message">No unresolved tickets</span>
            </div>
        </div>
    )
}
