import React from 'react';
import { Shield, Info } from 'lucide-react';

const FairnessBias: React.FC = () => {
    return (
        <div className="fade-in max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-600">
                    <Shield size={32} />
                </div>
                <h1 className="text-3xl font-light text-stone-800 mb-2">Fairness & Transparency</h1>
                <p className="text-stone-500">Understanding how our AI evaluates candidates.</p>
            </div>

            <div className="space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                    <h2 className="text-xl font-medium text-stone-800 mb-4">What we check for</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-stone-50 rounded-xl">
                            <h3 className="font-medium text-stone-700 mb-2">Skill Semantics</h3>
                            <p className="text-sm text-stone-600">We map related skills (e.g., "React" ≈ "Frontend") so candidates aren't penalized for using different synonyms.</p>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-xl">
                            <h3 className="font-medium text-stone-700 mb-2">Experience Context</h3>
                            <p className="text-sm text-stone-600">We analyze the *depth* of experience in a role, not just the job title or years worked.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                     <h2 className="text-xl font-medium text-stone-800 mb-4">Bias Mitigation Measures</h2>
                     <ul className="space-y-4">
                        <li className="flex gap-4">
                            <Info className="text-sage-600 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-stone-800">Name & PII Redaction</h4>
                                <p className="text-sm text-stone-600 mt-1">Candidate names, genders, and universities are hidden during the initial ranking phase to prevent unconscious bias.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Info className="text-sage-600 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-stone-800">Inclusive Language Check</h4>
                                <p className="text-sm text-stone-600 mt-1">Our JD generator automatically flags masculine-coded or exclusionary language.</p>
                            </div>
                        </li>
                     </ul>
                </section>
            </div>
        </div>
    );
};

export default FairnessBias;
