import React from 'react'
import './Card.css'
import { cardList } from '../config/cardList'

export default function Card() {
    const card = cardList.map((card,index) => {
        return (
            <div className="stat-card" key={index}>
                <span className="stat-label">{card.label}</span>
                <span className={`stat-value`}>{card.value}</span>
            </div>
        )
    })
    return (
        card
    )
}