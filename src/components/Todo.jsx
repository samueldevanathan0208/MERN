import React from 'react'
import './Todo.css'
import { Plus } from 'lucide-react'

export default function Todo() {
    return (
        <div className='unresolved-card'>
            <div className="card-header">
                <div className="header-left">
                    <h4>Todo</h4>
                    <span className='line'><Plus className="plus-icon" /><input type="text" /></span>
                </div>
            </div>
            <div className="card-body">
                <span className="empty-message">You have no tasks to do!</span>
            </div>
        </div>
    )
}
