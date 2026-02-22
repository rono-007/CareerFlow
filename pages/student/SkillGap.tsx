import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Skill, SkillStatus } from '../../types';

const mockSkills: Skill[] = [
    {
        name: "React.js",
        status: SkillStatus.STRONG,
        category: "Technical",
        reasoning: "You have 3+ years experience listed in 2 major projects.",
        context: "Experience: Senior Frontend Dev at TechCorp",
        improvementTip: "Consider contributing to open source React libraries to stand out further."
    },
    {
        name: "User Research",
        status: SkillStatus.STRONG,
        category: "Domain",
        reasoning: "Mentioned conducting interviews in your side project.",
        context: "Projects: Community App",
    },
    {
        name: "Data Analysis (SQL)",
        status: SkillStatus.DEVELOPING,
        category: "Technical",
        reasoning: "Keyword present, but no specific projects or complexity level described.",
        context: "Skills Section",
        improvementTip: "Add a bullet point about a complex query you wrote to solve a business problem."
    },
    {
        name: "Stakeholder Mgmt",
        status: SkillStatus.MISSING,
        category: "Soft",
        reasoning: "Crucial for PM roles. No explicit mention of cross-functional collaboration.",
        context: "Missing entirely",
        improvementTip: "Reflect on times you managed conflicting priorities between teams and add that narrative."
    },
    {
        name: "A/B Testing",
        status: SkillStatus.MISSING,
        category: "Domain",
        reasoning: "Standard requirement for growth roles.",
        context: "Missing entirely",
        improvementTip: "If you haven't done this, take a short course on Optimizely or Google Optimize principles."
    }
];

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
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const stored = localStorage.getItem('analysisResult');
        if (stored) {
            try {
                const data = JSON.parse(stored);
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
                setSkills(mappedSkills.length > 0 ? mappedSkills : mockSkills);
                setScore(data.readinessScore || 0);
            } catch (e) {
                console.error("Failed to parse analysis result", e);
                setSkills(mockSkills);
            }
        } else {
            setSkills(mockSkills);
        }
        setLoaded(true);
    }, []);

    const displaySkills = skills.length > 0 ? skills : mockSkills;
    const displayScore = score > 0 ? score : 65;

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
                    <span>{displayScore}% Match</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-800 rounded-full transition-all duration-1000" style={{ width: `${displayScore}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Confident */}
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-sage-500"></div>
                        <h3 className="font-semibold text-stone-800 text-lg">Confident Skills</h3>
                        <span className="ml-auto text-sm text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full">
                            {displaySkills.filter(s => s.status === SkillStatus.STRONG).length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {displaySkills.filter(s => s.status === SkillStatus.STRONG).map((skill, idx) => (
                            <SkillChip key={idx} skill={skill} />
                        ))}
                        {displaySkills.filter(s => s.status === SkillStatus.STRONG).length === 0 && (
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
                            {displaySkills.filter(s => s.status === SkillStatus.MISSING).length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {displaySkills.filter(s => s.status === SkillStatus.MISSING).map((skill, idx) => (
                            <SkillChip key={idx} skill={skill} />
                        ))}
                        {displaySkills.filter(s => s.status === SkillStatus.MISSING).length === 0 && (
                            <p className="text-sm text-stone-400 italic py-4 w-full text-center">No gaps detected. Great job!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGap;
