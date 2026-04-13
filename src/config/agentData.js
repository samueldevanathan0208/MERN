export const agentRecentTickets = [
  { id: '#T-1042', subject: 'Cannot access my account', status: 'In Progress', priority: 'High', time: '10 mins ago' },
  { id: '#T-1043', subject: 'Billing issue for pro plan', status: 'Assigned', priority: 'Medium', time: '2 hours ago' },
  { id: '#T-1044', subject: 'Feature request: dark mode', status: 'Resolved', priority: 'Low', time: '5 hours ago' },
  { id: '#T-1045', subject: 'API integration failing', status: 'Assigned', priority: 'Critical', time: '1 day ago' },
];

export const agentAllTickets = [
  { id: '#T-1042', subject: 'Cannot access my account', status: 'In Progress', priority: 'High', customer: 'Visalini', date: '2023-10-24', assignee: 'my' },
  { id: '#T-1043', subject: 'Billing issue for pro plan', status: 'Assigned', priority: 'Medium', customer: 'Gopika', date: '2023-10-25', assignee: 'assigned' },
  { id: '#T-1044', subject: 'Feature request: dark mode', status: 'Resolved', priority: 'Low', customer: 'Ragul', date: '2023-10-22', assignee: 'resolved' },
  { id: '#T-1045', subject: 'API integration failing', status: 'Open', priority: 'Critical', customer: 'Sudar', date: '2023-10-26', assignee: 'my' },
  { id: '#T-1046', subject: 'Password reset not working', status: 'In Progress', priority: 'High', customer: 'Hari', date: '2023-10-26', assignee: 'assigned' },
  { id: '#T-1047', subject: 'Cannot access my account', status: 'In Progress', priority: 'High', customer: 'Vivek', date: '2023-11-24', assignee: 'my' },
  { id: '#T-1048', subject: 'Billing issue for pro plan', status: 'Assigned', priority: 'Medium', customer: 'Sriraja', date: '2023-12-25', assignee: 'assigned' },
  { id: '#T-1049', subject: 'Feature request: dark mode', status: 'Resolved', priority: 'Low', customer: 'Visalini', date: '2023-04-22', assignee: 'resolved' },
];

export const agentTicketDetailMock = {
  subject: 'Cannot access my account',
  priority: 'High',
  status: 'In Progress',
  category: 'Authentication',
  created: 'Oct 24, 2023 at 10:30 AM',
  customer: {
    name: 'Visalini',
    email: 'visalini@example.com',
    company: 'Acme Corp',
    plan: 'Pro Plan'
  },
  thread: [
    {
      id: 1,
      author: 'Visalini',
      role: 'customer',
      time: 'Oct 24, 2023 at 10:30 AM',
      content: 'Hi support,\n\nI have been trying to log into my account since this morning but I keep getting a \"Invalid Credentials\" error. I have already tried resetting my password, but the new password still does not work.\n\nCould you please look into this urgently? I need access to generate my end-of-month reports.\n\nThanks,\nVisalini'
    },
    {
      id: 2,
      author: 'Vivek',
      role: 'agent',
      time: 'Oct 24, 2023 at 11:15 AM',
      content: 'Hi Visalini,\n\nI am sorry to hear you are having trouble logging in. Let me check your account settings.\n\nCould you confirm if you are using the SSO login or the standard email/password form?\n\nBest regards,\nVivek'
    },
    {
      id: 3,
      author: 'Visalini',
      role: 'customer',
      time: 'Oct 24, 2023 at 11:20 AM',
      content: 'I am using the standard email/password form directly on the homepage.'
    }
  ]
};
export const recentActivity = [
  {
    id: 1,
    user: { name: 'Vivek', avatar: 'https://i.pravatar.cc/150?u=vivek' },
    action: 'resolved ticket',
    ticketId: '#1204 - Login Issue',
    time: '12m ago',
    status: 'success'
  },
  {
    id: 2,
    user: { name: 'Sriraja', avatar: 'https://i.pravatar.cc/150?u=sriraja' },
    action: 'assigned agent to',
    ticketId: '#1205 - API Timeout',
    time: '45m ago',
    status: 'info'
  },
  {
    id: 3,
    user: { name: 'Gopika', avatar: 'https://i.pravatar.cc/150?u=gopika' },
    action: 'escalated ticket',
    ticketId: '#1198 - Data Breach Concern',
    time: '1h ago',
    status: 'destructive'
  },
  {
    id: 4,
    user: { name: 'Ragul', avatar: 'https://i.pravatar.cc/150?u=ragul' },
    action: 'replied to',
    ticketId: '#1202 - Billing Question',
    time: '2h ago',
    status: 'neutral'
  },
];

export const topAgents = [
  { id: 1, name: 'Vivek', avatar: 'https://i.pravatar.cc/150?u=vivek', resolved: 142, csat: 98, rank: 1 },
  { id: 2, name: 'Sriraja', avatar: 'https://i.pravatar.cc/150?u=sriraja', resolved: 128, csat: 94, rank: 2 },
  { id: 3, name: 'Gopika', avatar: 'https://i.pravatar.cc/150?u=gopika', resolved: 115, csat: 91, rank: 3 },
];
