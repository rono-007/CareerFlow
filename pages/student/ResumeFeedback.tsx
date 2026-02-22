import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeFeedback: React.FC = () => {
    const [feedback, setFeedback] = useState<any[]>([]);
    const [hasAnalysis, setHasAnalysis] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('analysisResult');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setHasAnalysis(true);
                // Map backend feedback if it exists, otherwise provide a default empty list
                setFeedback(data.feedback || []);
            } catch (e) {
                console.error("Failed to parse analysis result", e);
            }
        }
        setLoaded(true);
    }, []);

    if (loaded && !hasAnalysis) {
        return (
            <div className="fade-in max-w-5xl mx-auto py-20 text-center">
                <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <FileText size={40} className="text-stone-300" />
                </div>
                <h1 className="text-3xl font-light text-stone-800 mb-4">No Feedback Available</h1>
                <p className="text-stone-500 max-w-md mx-auto mb-8">
                    Analyze your resume to see detailed, line-by-line feedback from our AI agents.
                </p>
                <Link to="/student/upload" className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Upload Resume
                </Link>
            </div>
        );
    }

    return (
        <div className="fade-in h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 bg-stone-200 rounded-3xl flex items-center justify-center border border-stone-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-stone-50/50 backdrop-blur-[2px]"></div>
                <div className="relative z-10 text-center">
                    <FileText size={48} className="mx-auto text-stone-400 mb-4" />
                    <div className="text-stone-500 text-sm font-medium">Resume Preview Coming Soon</div>
                    <p className="text-xs text-stone-400 mt-2 px-8">Interactive PDF annotation is in development.</p>
                </div>
            </div>
            <div className="lg:col-span-1 overflow-y-auto pr-4">
                <Link to="/student/dashboard" className="text-sm text-stone-500 flex items-center gap-1 mb-6 hover:text-stone-800 group transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>
                <h1 className="text-2xl font-light text-stone-800 mb-6">Detailed Feedback</h1>

                <div className="space-y-4 pb-8">
                    {feedback.length > 0 ? (
                        feedback.map((item, idx) => (
                            <div key={idx}
                                className={`p-5 bg-white border-l-4 rounded-r-2xl shadow-sm transition-all hover:shadow-md ${item.type === 'strength' ? 'border-sage-500' : 'border-amber-400'
                                    }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {item.type === 'strength' ?
                                        <CheckCircle2 size={16} className="text-sage-500" /> :
                                        <AlertCircle size={16} className="text-amber-500" />
                                    }
                                    <h4 className="font-semibold text-stone-800">{item.section}</h4>
                                </div>
                                <p className="text-sm text-stone-600 leading-relaxed">{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 text-center">
                            <CheckCircle2 size={32} className="mx-auto text-sage-400 mb-4" />
                            <p className="text-stone-600 font-medium">No major improvements suggested.</p>
                            <p className="text-xs text-stone-400 mt-2">Your resume looks solid for the target requirements!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeFeedback;
