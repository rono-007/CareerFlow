import React from 'react';
import { Plus, Users, Clock, ArrowUpRight, Sparkles, Check, X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const jobs = [
    { id: '1', title: 'Senior Product Designer', count: 42, stage: 'Active', daysOpen: 12, quality: 85 },
    { id: '2', title: 'Frontend Engineer (React)', count: 18, stage: 'Active', daysOpen: 5, quality: 92 },
    { id: '3', title: 'Marketing Manager', count: 0, stage: 'Draft', daysOpen: 0, quality: 0 },
];

const qualityData = [
  { name: 'High Match (>85%)', value: 35, color: '#5cbf78' }, // Sage 500
  { name: 'Potential (70-85%)', value: 45, color: '#fbbf24' }, // Amber 400
  { name: 'Low Match (<70%)', value: 20, color: '#e7e5e4' }, // Stone 200
];

const RecruiterDashboard: React.FC = () => {
  return (
    <div className="fade-in max-w-7xl mx-auto h-full flex flex-col">
        {/* 1. Hiring Overview (Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-3 bg-stone-900 text-white rounded-3xl p-8 flex items-center justify-between shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-900 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-light mb-2">Hiring Pulse</h1>
                    <p className="text-stone-400">You have <span className="text-white font-medium">2 active roles</span> with <span className="text-white font-medium">60 candidates</span> to review.</p>
                </div>
                <div className="relative z-10 flex gap-8 text-center">
                    <div>
                        <span className="block text-3xl font-semibold">12h</span>
                        <span className="text-xs text-stone-400 uppercase tracking-wider">Time Saved</span>
                    </div>
                    <div>
                        <span className="block text-3xl font-semibold text-sage-400">14</span>
                        <span className="text-xs text-stone-400 uppercase tracking-wider">Shortlisted</span>
                    </div>
                </div>
            </div>
            
            <Link 
                to="/recruiter/create-job" 
                className="bg-white border-2 border-dashed border-stone-200 rounded-3xl p-6 flex flex-col items-center justify-center text-stone-400 hover:border-sage-500 hover:text-sage-600 hover:bg-sage-50 transition-all cursor-pointer group"
            >
                <div className="w-12 h-12 rounded-full bg-stone-100 group-hover:bg-sage-100 flex items-center justify-center mb-2 transition-colors">
                    <Plus size={24} />
                </div>
                <span className="font-medium">Draft New Job</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
            
            {/* 2. Active Job Pipelines (Left Column - 2/3) */}
            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-lg font-medium text-stone-800">Active Pipelines</h2>
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <Link key={job.id} to={job.stage === 'Active' ? `/recruiter/ranking/${job.id}` : '#'} className="block group">
                            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-stone-200 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-12 rounded-full ${
                                        job.stage === 'Active' ? 'bg-sage-500' : job.stage === 'Draft' ? 'bg-amber-400' : 'bg-stone-300'
                                    }`}></div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-stone-800 group-hover:text-sage-700 transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-stone-500 mt-1">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                job.stage === 'Active' ? 'bg-sage-50 text-sage-700' : 'bg-amber-50 text-amber-700'
                                            }`}>{job.stage}</span>
                                            {job.stage !== 'Draft' && (
                                                <span className="flex items-center gap-1"><Clock size={12} /> {job.daysOpen}d active</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {job.stage !== 'Draft' && (
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <span className="block text-lg font-semibold text-stone-800">{job.count}</span>
                                            <span className="text-xs text-stone-400">Total</span>
                                        </div>
                                        <div className="text-center hidden sm:block">
                                            <span className="block text-lg font-semibold text-sage-600">{Math.round(job.count * 0.3)}</span>
                                            <span className="text-xs text-stone-400">Top %</span>
                                        </div>
                                        <ArrowUpRight size={20} className="text-stone-300 group-hover:text-stone-600" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 3. Candidate Quality Snapshot */}
                <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mt-8">
                    <h3 className="font-medium text-stone-800 mb-6">Talent Pool Quality</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="h-48 w-48 relative">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={qualityData} 
                                        innerRadius={60} 
                                        outerRadius={80} 
                                        paddingAngle={5} 
                                        dataKey="value"
                                    >
                                        {qualityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                             </ResponsiveContainer>
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                 <span className="text-sm font-medium text-stone-500">Avg 78%</span>
                             </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {qualityData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-sm text-stone-600">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium text-stone-800">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
                
                {/* 4. AI Insight Panel */}
                <div className="bg-sage-50 rounded-3xl p-6 border border-sage-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={18} className="text-sage-600" />
                        <h3 className="font-medium text-sage-800">AI Insights</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-sage-100 shadow-sm">
                            <p className="text-sm text-stone-700 font-medium mb-1">Common Skill Gap</p>
                            <p className="text-xs text-stone-500 leading-relaxed">
                                45% of "Product Designer" candidates are missing <span className="font-medium text-stone-700">Prototyping</span> evidence in their summaries.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-sage-100 shadow-sm">
                            <p className="text-sm text-stone-700 font-medium mb-1">Source Quality</p>
                            <p className="text-xs text-stone-500 leading-relaxed">
                                Referrals are scoring 15% higher on average than board applicants this week.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Recent Human Actions */}
                <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm">
                    <h3 className="font-medium text-stone-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 flex-shrink-0">
                                <Check size={14} />
                            </div>
                            <div>
                                <p className="text-sm text-stone-700"><span className="font-medium">You</span> shortlisted Candidate #8821</p>
                                <p className="text-xs text-stone-400">2 mins ago</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                                <X size={14} />
                            </div>
                            <div>
                                <p className="text-sm text-stone-700"><span className="font-medium">You</span> rejected Candidate #1102</p>
                                <p className="text-xs text-stone-400">1 hour ago</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
                                <AlertTriangle size={14} />
                            </div>
                            <div>
                                <p className="text-sm text-stone-700">Fairness Flag cleared for Job #2</p>
                                <p className="text-xs text-stone-400">Yesterday</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 6. Fairness Indicators (Small) */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-stone-200 rounded-2xl">
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Bias Risk</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-sage-600">
                        <span className="w-2 h-2 rounded-full bg-sage-500"></span> Low
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecruiterDashboard;