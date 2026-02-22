import React from 'react';
import { Filter, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Candidate } from '../../types';

// Mock Data
const candidates: Candidate[] = [
    { id: 'C-8291', score: 94, topSkills: ['System Design', 'React', 'Node.js'], confidence: 'High', status: 'New', summary: "Perfect match for technical requirements." },
    { id: 'C-1102', score: 88, topSkills: ['React', 'TypeScript', 'UI/UX'], confidence: 'High', status: 'Reviewing', summary: "Strong frontend skills, less backend experience." },
    { id: 'C-3391', score: 72, topSkills: ['JavaScript', 'HTML/CSS'], confidence: 'Medium', status: 'New', summary: "Good potential but lacks senior architecture exp." },
    { id: 'C-9921', score: 65, topSkills: ['Angular', 'Java'], confidence: 'Low', status: 'New', summary: "Tech stack mismatch." },
];

const CandidateRanking: React.FC = () => {
    const { jobId } = useParams();

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'bg-sage-100 text-sage-700';
        if (score >= 70) return 'bg-amber-50 text-amber-700';
        return 'bg-stone-100 text-stone-500';
    };

    return (
        <div className="fade-in">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <Link to="/recruiter/dashboard" className="text-xs text-stone-400 hover:text-stone-600 uppercase tracking-wide font-medium mb-1 block">← Back to Jobs</Link>
                    <h1 className="text-2xl font-light text-stone-800">Candidates for <span className="font-medium">Job #{jobId}</span></h1>
                </div>
                <button className="flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm font-medium bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm">
                    <Filter size={16} /> Filters
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">ID</th>
                            <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Match Score</th>
                            <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Key Signals</th>
                            <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                            <th className="w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {candidates.map((c) => (
                            <tr key={c.id} className="group hover:bg-stone-50 transition-colors">
                                <td className="py-5 px-6 font-medium text-stone-600 text-sm">{c.id}</td>
                                <td className="py-5 px-6">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(c.score)}`}>
                                        {c.score}%
                                    </span>
                                </td>
                                <td className="py-5 px-6">
                                    <div className="flex flex-wrap gap-2">
                                        {c.topSkills.map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-white border border-stone-200 rounded text-xs text-stone-500">{s}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-5 px-6">
                                    <span className="text-sm text-stone-500">{c.status}</span>
                                </td>
                                <td className="py-5 px-6 text-right">
                                    <Link to={`/recruiter/candidate/${c.id}`} className="inline-block p-2 text-stone-300 group-hover:text-stone-600 transition-colors">
                                        <ChevronRight size={20} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateRanking;
