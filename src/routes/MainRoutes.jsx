import React from 'react'
import Dashboard from '../pages/dashboard/Dashboard'
import Settings from '../pages/settings/Settings'
import MainLayout from '../layouts/MainLayout'
import Tickets from '../pages/tickets/Tickets'
import Customers from '../pages/customers/Customers'
import Reports from '../pages/reports/Reports'

const MainRoutes ={
    path:"/",
    element:<MainLayout />,
    children :[
        {path:"/dashboard",
            element:<Dashboard />
        },
        {path:"tickects",
            element:<Tickets />
        },
        {path:"customers",
            element:<Customers />
        },
        {path:"report",
            element:<Reports />
        },
            {path:"/settings",
            element:<Settings />
        }
    ]
    
}

export default MainRoutes