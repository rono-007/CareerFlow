import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Check, X, MessageSquare } from 'lucide-react';

const CandidateDetail: React.FC = () => {
    const { candidateId } = useParams();

    return (
        <div className="fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* Left: Resume Snapshot (Mock) */}
            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm overflow-y-auto lg:col-span-1 hidden lg:block">
                <div className="flex items-center gap-3 mb-6 opacity-50">
                    <FileText size={20} />
                    <span className="font-medium text-sm">Resume Preview</span>
                </div>
                <div className="space-y-4">
                    <div className="h-6 bg-stone-100 w-3/4 rounded"></div>
                    <div className="h-4 bg-stone-100 w-1/2 rounded mb-8"></div>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                            <div key={i} className={`h-2 bg-stone-100 rounded ${Math.random() > 0.5 ? 'w-full' : 'w-5/6'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Center: AI Analysis */}
            <div className="lg:col-span-1 space-y-6 overflow-y-auto">
                <div>
                    <span className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-xs font-bold uppercase tracking-wider">Top Ranked Candidate</span>
                    <h1 className="text-3xl font-light text-stone-800 mt-4 mb-2">Candidate {candidateId}</h1>
                    <p className="text-stone-500 leading-relaxed">
                        This candidate shows exceptionally strong alignment with the Senior Architect requirements, specifically in distributed systems.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="font-medium text-stone-800 mb-4">Why high confidence?</h3>
                    <ul className="space-y-3 text-sm text-stone-600">
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2 flex-shrink-0"></span>
                            <p>Direct competitor experience (3 years at FinTech Co)</p>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2 flex-shrink-0"></span>
                            <p>Keywords match 92% of "Must Have" technical skills</p>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2 flex-shrink-0"></span>
                            <p>Leadership demonstrated through "Team Lead" title progression</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    <h3 className="font-medium text-stone-800 mb-4">Potential Risks</h3>
                    <ul className="space-y-3 text-sm text-stone-600">
                        <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                            <p>Short tenure in most recent role (8 months)</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right: Decision */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-stone-100 shadow-lg h-fit">
                <h3 className="font-medium text-stone-800 mb-6">Decision</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="py-4 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex flex-col items-center gap-2 text-stone-500 hover:text-stone-800">
                        <X size={24} />
                        <span className="text-sm font-medium">Reject</span>
                    </button>
                    <button className="py-4 bg-stone-800 text-white rounded-xl hover:bg-stone-900 transition-colors flex flex-col items-center gap-2 shadow-md">
                        <Check size={24} />
                        <span className="text-sm font-medium">Shortlist</span>
                    </button>
                </div>

                <div className="relative">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2 block">Notes</label>
                    <textarea 
                        className="w-full bg-stone-50 border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400 h-32 resize-none"
                        placeholder="Add internal notes..."
                    />
                    <button className="absolute bottom-3 right-3 text-stone-400 hover:text-stone-600">
                        <MessageSquare size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetail;
