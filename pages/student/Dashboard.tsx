import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../components/ui/Skeleton';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const progressData = [
    { month: 'Sep', score: 62 },
    { month: 'Oct', score: 65 },
    { month: 'Nov', score: 68 },
    { month: 'Dec', score: 71 },
    { month: 'Jan', score: 78 }, // Current
];

const StudentDashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('analysisResult');
        if (stored) {
            try {
                setAnalysis(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse analysis result', e);
            }
        }
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Extract data from analysis or use defaults
    const readinessScore = analysis?.readinessScore || 78;
    const strengths = analysis?.skills?.filter((s: any) => s.status === 'Strong').map((s: any) => s.name) || ['User Research', 'Agile Methodologies', 'Figma', 'React Basics'];
    const toBuild = analysis?.skills?.filter((s: any) => s.status === 'Missing' || s.status === 'To Build').map((s: any) => s.name) || ['SQL for Analytics', 'System Design'];
    const verdict = analysis?.agent2_output?.final_verdict || 'On Track';
    const mainGap = toBuild[0] || 'Technical Depth';
    const topStrengths = strengths.slice(0, 2);

    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

    if (loading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full fade-in">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-12 w-1/2 rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-full w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-light text-stone-800">
                        Career Readiness
                    </h1>
                    <p className="text-stone-500 mt-2 flex items-center gap-2">
                        Target: <span className="font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">{analysis?.jobRole || 'Product Manager'}</span>
                        <span className="text-stone-300">|</span>
                        <span className="text-xs text-stone-400">Updated today</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Readiness Snapshot (Hero) */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="relative w-40 h-40 flex-shrink-0">
                            {/* Added viewBox for strict coordinate mapping */}
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r={radius} stroke="#e7e5e4" strokeWidth="8" fill="transparent" />
                                <circle
                                    cx="80" cy="80" r={radius}
                                    stroke="#5cbf78" strokeWidth="8" fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-semibold text-stone-800 leading-none">{readinessScore}</span>
                                <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-2 font-medium">Score</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <h2 className="text-xl font-medium text-stone-800 mb-2">{readinessScore >= 70 ? "You're on track!" : readinessScore >= 40 ? "Getting there!" : "Let's get started!"}</h2>
                            <p className="text-stone-500 leading-relaxed mb-6">
                                {analysis ? (
                                    <>
                                        Your profile shows {strengths.length > 0 && <><span className="text-sage-600 font-medium">{strengths.length} strengths</span> and </>}
                                        {toBuild.length > 0 ? <span className="text-stone-700">{toBuild.length} areas to improve</span> : 'good alignment'}.
                                        {topStrengths.length > 0 && (
                                            <> Strong in {topStrengths.map((s: string, i: number) => (
                                                <span key={i}>
                                                    <span className="text-stone-700">{s}</span>
                                                    {i < topStrengths.length - 1 && ' and '}
                                                </span>
                                            ))}.</>
                                        )}
                                    </>
                                ) : (
                                    <>Upload your resume to see personalized insights and skill gap analysis.</>
                                )}
                            </p>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-sage-50 rounded-xl border border-sage-100">
                                    <span className="block text-xs text-sage-600 uppercase font-bold tracking-wider mb-1">Confidence</span>
                                    <span className="text-sage-700 font-medium">{readinessScore >= 70 ? 'High' : readinessScore >= 40 ? 'Moderate' : 'Low'}</span>
                                </div>
                                <div className="px-4 py-2 bg-stone-50 rounded-xl border border-stone-100">
                                    <span className="block text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Gap</span>
                                    <span className="text-stone-600 font-medium">{mainGap}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Skill Strength Overview & Gaps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                            <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-sage-500" />
                                Strengths
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {strengths.slice(0, 6).map((s: string) => (
                                    <span key={s} className="px-3 py-1.5 bg-sage-50 text-sage-700 rounded-lg text-sm border border-sage-100">
                                        {s}
                                    </span>
                                ))}
                                {strengths.length === 0 && <span className="text-sm text-stone-400">No strengths detected yet.</span>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                            <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-500" />
                                To Build
                            </h3>
                            <ul className="space-y-3">
                                {toBuild.slice(0, 4).map((s: string, idx: number) => (
                                    <li key={idx} className="text-sm text-stone-600 flex justify-between items-center">
                                        <span>{s}</span>
                                        <Link to="/student/gap-analysis" className="text-xs text-sage-600 hover:underline">View</Link>
                                    </li>
                                ))}
                                {toBuild.length === 0 && <li className="text-sm text-stone-400">No gaps detected.</li>}
                            </ul>
                        </div>
                    </div>

                    {/* Next Best Actions - moved here */}
                    <div className="bg-stone-900 text-stone-50 p-8 rounded-3xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                        <h3 className="relative z-10 font-medium text-white mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-sage-400" />
                            Next Best Actions
                        </h3>

                        <ul className="relative z-10 space-y-4">
                            {(analysis?.actions && analysis.actions.length > 0 ? analysis.actions : [
                                { title: "Quantify Project Alpha", details: "Add specific metrics to bullet points 2 & 3.", priority: "High" },
                                { title: "SQL Certification", details: "Complete a basic course to clear the 'Missing' tag.", priority: "Medium" },
                                { title: "Tailor your summary", details: "Update your professional summary to match job requirements.", priority: "Low" }
                            ]).slice(0, 3).map((action: any, idx: number) => (
                                <li key={idx} className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:bg-stone-800 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${action.priority === 'High' ? 'bg-rose-500' :
                                            action.priority === 'Medium' ? 'bg-amber-500' : 'bg-sage-500'
                                            }`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-stone-200 group-hover:text-white">{action.title}</p>
                                            <p className="text-xs text-stone-400 mt-1">{action.details}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/student/upload"
                            className="relative z-10 block w-full bg-white text-stone-900 text-center py-3 rounded-xl font-medium hover:bg-stone-100 transition-colors mt-6 text-sm"
                        >
                            Update Resume
                        </Link>
                    </div>
                </div>

                {/* Right Column (1/3 width) */}
                <div className="space-y-8">

                    {/* 4. Resume Health Check */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="font-medium text-stone-800 mb-6 flex items-center gap-2">
                            <FileText size={18} className="text-stone-400" />
                            Resume Health
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-stone-500">Structure Clarity</span>
                                    <span className="text-stone-800 font-medium">Excellent</span>
                                </div>
                                <div className="h-1.5 w-full bg-stone-100 rounded-full">
                                    <div className="h-full bg-sage-500 w-[95%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-stone-500">Keyword Alignment</span>
                                    <span className="text-stone-800 font-medium">Good</span>
                                </div>
                                <div className="h-1.5 w-full bg-stone-100 rounded-full">
                                    <div className="h-full bg-sage-500 w-[75%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-stone-500">Impact Metrics</span>
                                    <span className="text-amber-600 font-medium">Needs Work</span>
                                </div>
                                <div className="h-1.5 w-full bg-stone-100 rounded-full">
                                    <div className="h-full bg-amber-400 w-[40%] rounded-full"></div>
                                </div>
                                <p className="text-xs text-stone-400 mt-2">Try adding ROI % to your last project.</p>
                            </div>
                        </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="font-medium text-stone-800 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-stone-400" />
                            Resume Preview
                        </h3>

                        {analysis?.agent1_output ? (
                            <div className="space-y-4 text-sm">
                                <div className="p-3 bg-stone-50 rounded-xl">
                                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Skills Found</p>
                                    <div className="flex flex-wrap gap-1">
                                        {[...strengths.slice(0, 4), ...toBuild.slice(0, 2)].map((skill: string, i: number) => (
                                            <span key={i} className={`text-xs px-2 py-0.5 rounded ${i < strengths.slice(0, 4).length ? 'bg-sage-100 text-sage-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-3 bg-stone-50 rounded-xl">
                                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Gap Summary</p>
                                    <p className="text-stone-600 text-xs leading-relaxed">
                                        {analysis?.agent1_output?.skill_gap_summary || 'No gaps detected.'}
                                    </p>
                                </div>

                                <div className="p-3 bg-stone-50 rounded-xl">
                                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Verdict</p>
                                    <p className="text-stone-700 font-medium">
                                        {analysis?.agent2_output?.final_verdict || 'Pending'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText size={32} className="mx-auto text-stone-300 mb-3" />
                                <p className="text-sm text-stone-400">No resume analyzed yet.</p>
                                <Link
                                    to="/student/upload"
                                    className="inline-block mt-3 text-sm text-sage-600 hover:underline"
                                >
                                    Upload Resume →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
