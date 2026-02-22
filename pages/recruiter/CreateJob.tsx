import React, { useState } from 'react';
import { Sparkles, Save, AlignLeft } from 'lucide-react';
import { generateJobDescription } from '../../services/geminiService';

const CreateJob: React.FC = () => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [generatedJD, setGeneratedJD] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!title || !notes) return;
        setLoading(true);
        const jd = await generateJobDescription(title, notes);
        setGeneratedJD(jd);
        setLoading(false);
    };

    return (
        <div className="fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* Input Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-light text-stone-800 mb-6">Draft Job Description</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-2">Job Title</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                                placeholder="e.g. Senior Product Designer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-2">Rough Notes & Requirements</label>
                            <textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all h-64 resize-none"
                                placeholder="- Must know Figma and Protopie&#10;- 5+ years experience&#10;- Worked in Fintech prefered&#10;- Remote friendly but US timezone"
                            />
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                onClick={handleGenerate}
                                disabled={loading || !title || !notes}
                                className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                                    loading || !title || !notes 
                                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                                    : 'bg-stone-800 text-white hover:bg-stone-900 shadow-md'
                                }`}
                            >
                                {loading ? 'Drafting...' : <><Sparkles size={18} /> Generate Draft</>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-sage-50 rounded-2xl p-6 border border-sage-100 mt-auto">
                    <h4 className="font-medium text-sage-800 mb-2">Pro Tip</h4>
                    <p className="text-sm text-sage-600 leading-relaxed">
                        Don't worry about formatting. Just list the raw requirements, cultural vibes, and technical needs. The AI will structure it perfectly.
                    </p>
                </div>
            </div>

            {/* Editor Column */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-stone-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                    <div className="flex items-center gap-2 text-stone-500">
                        <AlignLeft size={18} />
                        <span className="text-sm font-medium">Editor Preview</span>
                    </div>
                    <button className="text-stone-400 hover:text-stone-800 transition-colors">
                        <Save size={18} />
                    </button>
                </div>
                
                <div className="flex-1 p-8 overflow-y-auto">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-8 bg-stone-100 w-3/4 rounded mb-8"></div>
                            <div className="h-4 bg-stone-100 w-full rounded"></div>
                            <div className="h-4 bg-stone-100 w-full rounded"></div>
                            <div className="h-4 bg-stone-100 w-5/6 rounded"></div>
                            <div className="h-4 bg-stone-100 w-full rounded mt-6"></div>
                        </div>
                    ) : generatedJD ? (
                        <div className="prose prose-stone max-w-none whitespace-pre-wrap">
                            {generatedJD}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-stone-300">
                            <AlignLeft size={48} className="mb-4 opacity-50" />
                            <p>Generated Job Description will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
