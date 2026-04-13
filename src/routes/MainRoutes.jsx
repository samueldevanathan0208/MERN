import React from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Settings from '../pages/admin/Settings'
import MainLayout from '../layouts/MainLayout'
import Tickets from '../pages/admin/Tickets'
import Customers from '../pages/admin/Customers'
import Reports from '../pages/admin/Reports'
import AgentDashboard from '../pages/agent/AgentDashboard'
import MyTickets from '../pages/agent/MyTickets'
import Profile from '../pages/agent/profile'
import Login from '../pages/auth/Login'

import ProtectedRoute from '../components/ProtectedRoute'

const MainRoutes = [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <MainLayout />,
        children: [
            // Admin Only Routes
            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/tickets", element: <Tickets /> },
                    { path: "/customers", element: <Customers /> },
                    { path: "/reports", element: <Reports /> },
                    { path: "/settings", element: <Settings /> },
                ]
            },
            // Agent Only Routes
            {
                element: <ProtectedRoute allowedRoles={['agent']} />,
                children: [
                    { path: "/agent/dashboard", element: <AgentDashboard /> },
                    { path: "/agent/my-tickets", element: <MyTickets filterType="my" /> },
                    { path: "/agent/assigned-tickets", element: <MyTickets filterType="assigned" /> },
                    { path: "/agent/resolved-tickets", element: <MyTickets filterType="resolved" /> },
                    { path: "/agent/profile", element: <Profile /> },
                ]
            }
        ]
    }
]

export default MainRoutes