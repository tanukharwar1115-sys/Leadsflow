// ⚠️ MOCK DATA — for UI design only. Replaced by API data once the backend is connected.
export const mockStats = {
  totalLeads: { value: '1,284', hint: 'vs last month', trend: { value: '12%', up: true }, spark: [22, 28, 25, 34, 30, 41, 38, 47, 52, 49, 58, 64] },
  newEnquiries: { value: '86', hint: 'last 7 days', trend: { value: '8%', up: true }, spark: [9, 12, 8, 14, 11, 15, 13, 12, 16, 14, 18, 17] },
  qualifiedLeads: { value: '342', hint: '26.6% of total', trend: { value: '3%', up: true }, spark: [30, 32, 31, 36, 35, 38, 37, 41, 40, 44, 43, 47] },
  appointments: { value: '27', hint: 'this week', trend: { value: '5%', up: false }, spark: [6, 5, 7, 6, 8, 7, 6, 7, 5, 6, 5, 6] },
}

export const mockLeadTrend = [
  ['1 Oct', 18], ['3 Oct', 24], ['5 Oct', 21], ['7 Oct', 32], ['9 Oct', 28], ['11 Oct', 36], ['13 Oct', 31],
  ['15 Oct', 42], ['17 Oct', 39], ['19 Oct', 47], ['21 Oct', 44], ['23 Oct', 53], ['25 Oct', 49], ['27 Oct', 58],
].map(([label, value]) => ({ label, value }))

export const mockPipeline = [
  { stage: 'New', count: 412, tone: 'bg-sky-500' },
  { stage: 'Contacted', count: 301, tone: 'bg-brand-500' },
  { stage: 'Qualified', count: 342, tone: 'bg-emerald-500' },
  { stage: 'Viewing booked', count: 96, tone: 'bg-amber-500' },
  { stage: 'Won', count: 58, tone: 'bg-teal-600' },
]

export const mockRecentLeads = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.m@example.com', source: 'Website chatbot', status: 'new', agent: 'Daniel Ross', date: 'Today' },
  { id: 2, name: 'James Carter', email: 'j.carter@example.com', source: 'Zillow', status: 'qualified', agent: 'Priya Shah', date: 'Today' },
  { id: 3, name: 'Olivia Bennett', email: 'olivia.b@example.com', source: 'Voice agent', status: 'contacted', agent: 'Daniel Ross', date: 'Yesterday' },
  { id: 4, name: 'Mohammed Khan', email: 'm.khan@example.com', source: 'Rightmove', status: 'qualified', agent: 'Emma Clarke', date: 'Yesterday' },
  { id: 5, name: 'Emily Johnson', email: 'emily.j@example.com', source: 'Referral', status: 'lost', agent: 'Priya Shah', date: '2 days ago' },
]

export const mockActivity = [
  { id: 1, text: 'Sarah Mitchell enquired about 12 Oak Street', time: '5 min ago', tone: 'blue' },
  { id: 2, text: 'James Carter qualified by AI assistant', time: '1 hour ago', tone: 'green' },
  { id: 3, text: 'Viewing booked: Olivia Bennett, Fri 11:00', time: '3 hours ago', tone: 'indigo' },
  { id: 4, text: 'Follow-up email sent to Mohammed Khan', time: 'Yesterday', tone: 'amber' },
  { id: 5, text: 'Emily Johnson marked as lost', time: '2 days ago', tone: 'slate' },
]
