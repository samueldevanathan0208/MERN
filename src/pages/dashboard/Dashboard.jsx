import React from "react";
import { Search, Bell, CircleQuestionMark } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import "./Dashboard.css"
import Card from "../../components/Card"
import UnresolvedCard from "../../components/UnresolvedCard";
import UndeliveredCard from "../../components/UndeliveredCard";
import Todo from "../../components/Todo";


export default function Dashboard() {
  return (
    <div>
      <nav className="navbar">
        <h1>Dashboard</h1>
        <ul>
          <span className="new"><li><SquarePlus className="w-5 h-5" />New</li></span>

          <li><Search className="w-5 h-5" /></li>
          <li><Bell className="w-5 h-5" /></li>
          <li><CircleQuestionMark className="w-5 h-5" /></li>
          <li className="user-initial">S</li>
        </ul>
      </nav>
      <main className="dashboard-content">
        <div className="card-container">
          <Card />
        </div>
        <div className="dashboard-grid">
          <UnresolvedCard />
          <UndeliveredCard />
          <Todo />
        </div>
      </main>
    </div>
  );
}
