import React from "react"
import { Search, Bell, CircleQuestionMark } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import TickectCard from "../../components/TickectCard";
export default function Tickets() {
  return (
    <div>
      <nav className="navbar">
        <h1>Tickets</h1>
        <ul>
          <span className="new"><li><SquarePlus className="w-5 h-5" />New</li></span>

          <li><Search className="w-5 h-5" /></li>
          <li><Bell className="w-5 h-5" /></li>
          <li><CircleQuestionMark className="w-5 h-5" /></li>
          <li className="user-initial">S</li>
        </ul>
      </nav>
      <main className="tickets-content">
        <div className="tickets-list">
          <TickectCard />
        </div>
      </main>

    </div>
  )
}
