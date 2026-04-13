import React from 'react';
import {
    Clock,
    CircleCheck,
    CircleUser,
    Star,
    Zap,
    MessageSquare,
    ShieldAlert,
    UserPlus
} from "lucide-react";

const ReportCardList = [
    {
        id: 1,
        icon: <Clock />,
        title: "Avg. Response Time",
        value: "1h 24m",
        percentage: "12%",
        trend: "up"
    },
    {
        id: 2,
        icon: <CircleCheck />,
        title: "Resolution Rate",
        value: "94.2%",
        percentage: "3.1%",
        trend: "up"
    },
    {
        id: 3,
        icon: <CircleUser />,
        title: "Total Resolved",
        value: "1,284",
        percentage: "8%",
        trend: "up"
    }
];

export const teamPerformance = [
    { id: 1, name: "Vivek", resolved: 142, avgTime: "45m", avatar: "https://i.pravatar.cc/150?u=vivek" },
    { id: 2, name: "Sriraja", resolved: 128, avgTime: "1h 10m", avatar: "https://i.pravatar.cc/150?u=sriraja" },
    { id: 3, name: "Ragul", resolved: 115, avgTime: "1h 25m", avatar: "https://i.pravatar.cc/150?u=ragul" },
    { id: 4, name: "Visalini", resolved: 108, avgTime: "55m", avatar: "https://i.pravatar.cc/150?u=visalini" },
];

export const ticketStatusDistribution = [
    { label: "Resolved", count: 850, color: "#34a853" },
    { label: "In Progress", count: 240, color: "#4285f4" },
    { label: "Assigned", count: 120, color: "#fbbc05" },
    { label: "Open", count: 74, color: "#ea4335" },
];

export default ReportCardList;
