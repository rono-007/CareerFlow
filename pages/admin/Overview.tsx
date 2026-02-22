import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, ShieldCheck, FileText, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const fairnessData = [
  { day: 'Mon', rate: 0.98 },
  { day: 'Tue', rate: 0.99 },
  { day: 'Wed', rate: 0.97 },
  { day: 'Thu', rate: 0.99 },
  { day: 'Fri', rate: 0.99 },
  { day: 'Sat', rate: 1.0 },
  { day: 'Sun', rate: 1.0 },
];

const auditLogs = [
    { id: 1, action: "Override Score", user: "Recruiter A", target: "Candidate #9921", time: "10:42 AM" },
    { id: 2, action: "Bias Flag Resolved", user: "Admin", target: "Job #2", time: "09:15 AM" },
    { id: 3, action: "Export Data", user: "Admin", target: "All Candidates", time: "Yesterday" },
];

const AdminOverview: React.FC = () => {
  return (
    <div className="fade-in max-w-7xl mx-auto">
        <h1 className="text-3xl font-light text-stone-800 mb-8">System Governance</h1>

        {/* 1. System Health Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start justify-between">
                <div>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">Total Processed</p>
                    <span className="text-2xl font-semibold text-stone-800">1,204</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-lg text-stone-400">
                    <FileText size={20} />
                </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start justify-between">
                <div>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">Avg Latency</p>
                    <span className="text-2xl font-semibold text-stone-800">1.2s</span>
                </div>
                <div className="p-2 bg-sage-50 rounded-lg text-sage-500">
                    <Activity size={20} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start justify-between">
                 <div>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">Human Overrides</p>
                    <span className="text-2xl font-semibold text-stone-800">2.4%</span>
                </div>
                 <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                    <AlertOctagon size={20} />
                </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start justify-between">
                 <div>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">Trust Score</p>
                    <span className="text-2xl font-semibold text-sage-600">98%</span>
                </div>
                 <div className="p-2 bg-sage-50 rounded-lg text-sage-500">
                    <ShieldCheck size={20} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* 3. Fairness Overview (Chart) */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-lg font-medium text-stone-800">Fairness Consistency</h3>
                        <p className="text-sm text-stone-500">Tracking demographic parity adherence over last 7 days.</p>
                    </div>
                    <Link to="/admin/fairness" className="text-sm font-medium text-sage-600 hover:text-sage-700">View Details</Link>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={fairnessData}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5cbf78" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#5cbf78" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e7e5e4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                            <Area type="monotone" dataKey="rate" stroke="#5cbf78" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 2. Model Trust Metrics / Alerts */}
            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-6">Risk Monitors</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-stone-600">Confidence Calibration</span>
                            <span className="text-sage-600 font-medium">Stable</span>
                        </div>
                        <div className="h-2 w-full bg-stone-200 rounded-full">
                            <div className="h-full bg-sage-500 w-[95%] rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-stone-600">Concept Drift (Skills)</span>
                            <span className="text-stone-500 font-medium">Detected</span>
                        </div>
                        <div className="h-2 w-full bg-stone-200 rounded-full">
                            <div className="h-full bg-amber-400 w-[15%] rounded-full"></div>
                        </div>
                        <p className="text-xs text-stone-400 mt-2">New keywords 'React 19' appearing frequently.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. Audit & Compliance */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="font-medium text-stone-800">Recent Audit Logs</h3>
                <button className="text-sm text-stone-500 hover:text-stone-800">Export CSV</button>
            </div>
            <table className="w-full">
                <thead className="bg-stone-50">
                    <tr>
                        <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Action</th>
                        <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">User</th>
                        <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Target</th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Time</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                    {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-stone-800">{log.action}</td>
                            <td className="py-4 px-6 text-sm text-stone-600">{log.user}</td>
                            <td className="py-4 px-6 text-sm text-stone-500">{log.target}</td>
                            <td className="py-4 px-6 text-sm text-stone-400 text-right">{log.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminOverview;