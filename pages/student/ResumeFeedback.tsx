import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeFeedback: React.FC = () => {
    return (
        <div className="fade-in h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 bg-stone-200 rounded-lg flex items-center justify-center border border-stone-300">
                <div className="text-stone-500 text-sm">PDF Preview Container</div>
            </div>
            <div className="lg:col-span-1 overflow-y-auto">
                <Link to="/student/dashboard" className="text-sm text-stone-500 flex items-center gap-1 mb-6 hover:text-stone-800">
                    <ArrowLeft size={16} /> Back
                </Link>
                <h1 className="text-2xl font-light text-stone-800 mb-6">Detailed Feedback</h1>

                <div className="space-y-4">
                    <div className="p-4 bg-white border-l-4 border-sage-500 rounded-r-xl shadow-sm">
                        <h4 className="font-medium text-stone-800">Strong Impact Statements</h4>
                        <p className="text-sm text-stone-600 mt-1">Excellent use of quantification in your "TechCorp" role. "Reduced latency by 40%" is a great signal.</p>
                    </div>

                    <div className="p-4 bg-white border-l-4 border-amber-400 rounded-r-xl shadow-sm">
                        <h4 className="font-medium text-stone-800">Summary needs focus</h4>
                        <p className="text-sm text-stone-600 mt-1">Your summary is generic. Tailor it to mention "Product Management" specifically rather than just "Leadership".</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeFeedback;
