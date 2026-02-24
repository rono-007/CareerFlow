import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

interface RoleToggleProps {
    role: 'student' | 'recruiter';
    setRole: (role: 'student' | 'recruiter') => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ role, setRole }) => {
    const controls = useAnimationControls();

    useEffect(() => {
        // Run the complex multi-stage animation sequence on Role change
        const runSequence = async () => {
            await controls.start({
                // Entry + Overshoot + Stabilize
                scale: [1, 1.08, 0.98, 1],
                y: [0, -3, 0],
                x: role === 'student' ? '0%' : '100%',
                transition: {
                    scale: {
                        times: [0, 0.4, 0.7, 1],
                        duration: 0.38,
                        ease: ["easeOut", "easeInOut", "circOut"]
                    },
                    y: {
                        times: [0, 0.4, 1],
                        duration: 0.38,
                        ease: "easeOut"
                    },
                    x: { type: 'spring', stiffness: 300, damping: 30 }
                }
            });

            // Re-trigger the soft pulse after stabilization
            controls.start("pulse");
        };

        runSequence();
    }, [role, controls]);

    const highlightVariants = {
        pulse: {
            boxShadow: [
                '0px 0px 4px 0px rgba(27, 94, 32, 0.1)',
                '0px 0px 20px 0px rgba(27, 94, 32, 0.25)',
                '0px 0px 4px 0px rgba(27, 94, 32, 0.1)'
            ],
            transition: {
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
            }
        }
    };

    return (
        <div className="flex bg-nature-forest/[0.03] p-1.5 rounded-2xl mb-10 relative border border-nature-forest/5 shadow-inner">
            {/* Persistent Sliding Highlight - Zero Blinking */}
            <div className="absolute inset-y-1.5 left-1.5 right-1.5 pointer-events-none">
                <motion.div
                    className="h-full rounded-xl w-1/2 bg-white border border-nature-primary/10 shadow-sm"
                    animate={controls}
                    variants={highlightVariants}
                    initial={{ x: role === 'student' ? '0%' : '100%', scale: 1 }}
                />
            </div>

            <button
                onClick={() => setRole('student')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-500 relative z-10 ${role === 'student' ? 'text-nature-primary' : 'text-nature-forest/40 hover:text-nature-forest/60'
                    }`}
            >
                <GraduationCap size={18} strokeWidth={role === 'student' ? 2.5 : 2} />
                Student
            </button>
            <button
                onClick={() => setRole('recruiter')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-500 relative z-10 ${role === 'recruiter' ? 'text-nature-primary' : 'text-nature-forest/40 hover:text-nature-forest/60'
                    }`}
            >
                <Briefcase size={18} strokeWidth={role === 'recruiter' ? 2.5 : 2} />
                Recruiter
            </button>
        </div>
    );
};

export default RoleToggle;
