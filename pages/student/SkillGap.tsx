import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Skill, SkillStatus } from '../../types';


const SkillChip: React.FC<{ skill: Skill }> = ({ skill }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const chipColors = {
        [SkillStatus.STRONG]: "bg-sage-50 text-sage-700 border-sage-200 hover:bg-sage-100",
        [SkillStatus.DEVELOPING]: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
        [SkillStatus.MISSING]: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    };

    const Icon = {
        [SkillStatus.STRONG]: CheckCircle2,
        [SkillStatus.DEVELOPING]: TrendingUp,
        [SkillStatus.MISSING]: AlertCircle,
    }[skill.status];

    return (
        <div className="relative group">
            <div
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all ${chipColors[skill.status]}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Icon size={14} />
                <span>{skill.name}</span>
            </div>

            {/* Tooltip on hover */}
            {showTooltip && skill.reasoning && (
                <div className="absolute z-20 bottom-full left-0 mb-2 w-64 p-3 bg-stone-800 text-white text-xs rounded-lg shadow-lg">
                    <p className="font-medium mb-1">{skill.name}</p>
                    <p className="text-stone-300">{skill.reasoning}</p>
                    {skill.improvementTip && (
                        <p className="mt-2 text-sage-300 border-t border-stone-600 pt-2">
                            💡 {skill.improvementTip}
                        </p>
                    )}
                    <div className="absolute bottom-0 left-4 translate-y-1/2 rotate-45 w-2 h-2 bg-stone-800"></div>
                </div>
            )}
        </div>
    );
};

const SkillGap: React.FC = () => {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [score, setScore] = React.useState(0);
    const [hasAnalysis, setHasAnalysis] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const stored = localStorage.getItem('analysisResult');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setHasAnalysis(true);
                // Map backend skill format to frontend Skill type
                const mappedSkills: Skill[] = (data.skills || []).map((s: any) => ({
                    name: s.name,
                    status: s.status === 'Strong' ? SkillStatus.STRONG :
                        s.status === 'Developing' ? SkillStatus.DEVELOPING :
                            SkillStatus.MISSING,
                    category: s.category || 'Technical',
                    reasoning: s.reasoning || '',
                    context: s.context || '',
                    improvementTip: s.improvementTip || ''
                }));
                setSkills(mappedSkills);
                setScore(data.readinessScore || 0);
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
                    <AlertCircle size={40} className="text-stone-300" />
                </div>
                <h1 className="text-3xl font-light text-stone-800 mb-4">No Skill Gap Analysis</h1>
                <p className="text-stone-500 max-w-md mx-auto mb-8">
                    Upload your resume to see a detailed comparison of your skills against industry standards.
                </p>
                <a href="#/student/upload" className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Upload Resume
                </a>
            </div>
        );
    }

    return (
        <div className="fade-in max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-light text-stone-800">Skill Gap Analysis</h1>
                <p className="text-stone-500 mt-2">Comparison against: <span className="font-medium text-stone-800">Target Role</span></p>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-sm mb-2 font-medium text-stone-600">
                    <span>Resume Alignment</span>
                    <span>{score}% Match</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-800 rounded-full transition-all duration-1000" style={{ width: `${score}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Confident */}
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-sage-500"></div>
                        <h3 className="font-semibold text-stone-800 text-lg">Confident Skills</h3>
                        <span className="ml-auto text-sm text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full">
                            {skills.filter(s => s.status === SkillStatus.STRONG).length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.filter(s => s.status === SkillStatus.STRONG).map((skill, idx) => (
                            <SkillChip key={idx} skill={skill} />
                        ))}
                        {skills.filter(s => s.status === SkillStatus.STRONG).length === 0 && (
                            <p className="text-sm text-stone-400 italic py-4 w-full text-center">No strong matches found.</p>
                        )}
                    </div>
                </div>

                {/* Column 2: To Build */}
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <h3 className="font-semibold text-stone-800 text-lg">Skills to Build</h3>
                        <span className="ml-auto text-sm text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                            {skills.filter(s => s.status === SkillStatus.MISSING).length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.filter(s => s.status === SkillStatus.MISSING).map((skill, idx) => (
                            <SkillChip key={idx} skill={skill} />
                        ))}
                        {skills.filter(s => s.status === SkillStatus.MISSING).length === 0 && (
                            <p className="text-sm text-stone-400 italic py-4 w-full text-center">No gaps detected. Great job!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGap;
