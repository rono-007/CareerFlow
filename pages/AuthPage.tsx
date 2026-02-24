import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/auth/AnimatedBackground';
import RoleToggle from '../components/auth/RoleToggle';
import AuthForm from '../components/auth/AuthForm';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const AuthPage: React.FC = () => {
    const [role, setRole] = useState<'student' | 'recruiter'>('student');
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;
            const { clientX, clientY } = e;
            const xCenter = window.innerWidth / 2;
            const yCenter = window.innerHeight / 2;

            // Subtle tilt calculation
            const xRotation = (clientY - yCenter) / yCenter * 4;
            const yRotation = (clientX - xCenter) / xCenter * -4;

            gsap.to(cardRef.current, {
                rotateX: xRotation,
                rotateY: yRotation,
                duration: 1.2,
                ease: "power2.out",
                perspective: 1000
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Header Logo - Centered above the container */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex items-center gap-2 cursor-pointer group"
                >
                    <div className="bg-nature-primary p-2.5 rounded-2xl shadow-xl shadow-nature-primary/25 group-hover:rotate-12 transition-transform duration-500">
                        <ShieldCheck className="text-white" size={26} />
                    </div>
                    <span className="text-2xl font-bold text-nature-forest tracking-tighter">CareerFlow <span className="text-nature-primary">AI</span></span>
                </motion.div>

                {/* Main Split Container */}
                <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[1000px] will-change-transform"
                >
                    <div className="bg-white/60 backdrop-blur-[40px] border border-white/60 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(27,94,32,0.12)] relative overflow-hidden flex flex-col md:flex-row min-h-[640px] group/card">

                        {/* Left Side: Form Content */}
                        <div className="flex-1 p-8 md:p-14 relative z-10 flex flex-col justify-center">
                            {/* Role Toggle Selector */}
                            <RoleToggle role={role} setRole={setRole} />

                            {/* Content Switcher */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={role}
                                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    <AuthForm role={role} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Side: Visual & Social Proof Area */}
                        <div className="flex-1 bg-nature-primary/[0.03] p-8 md:p-14 flex flex-col items-center justify-center relative overflow-hidden border-l border-white/20">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-nature-leaf/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nature-wood/10 rounded-full blur-[80px] pointer-events-none" />

                            {/* Illustration Panel (User Screenshot) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                className="relative z-10 w-full flex flex-col items-center justify-center pt-8"
                            >
                                <div className="w-full max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 bg-white/10 backdrop-blur-sm group/image transition-all duration-700 hover:scale-[1.02] hover:shadow-nature-primary/10">
                                    <img
                                        src="/assets/Screenshot 2026-02-24 184414.jpg"
                                        alt="CareerFlow Flow State"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'aspect-video', 'bg-nature-leaf/20');
                                            e.currentTarget.parentElement!.innerHTML = '<div class="text-center p-12"><div class="text-nature-primary mb-2 font-bold text-xs uppercase tracking-widest">Image Syncing...</div></div>';
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <div className="mt-8 text-center space-y-4 relative z-10 px-4">
                                <h3 className="text-2xl font-bold text-nature-forest leading-tight">
                                    Unlock your professional <br /> <span className="text-nature-primary">Flow State</span>
                                </h3>
                                <p className="text-sm text-nature-wood/60 font-medium max-w-[280px] mx-auto">
                                    Join 10k+ users who optimized their career path with our deep-core AI.
                                </p>

                                {/* Page Indicators */}
                                <div className="flex justify-center gap-1.5 pt-4">
                                    <div className="w-6 h-1.5 rounded-full bg-nature-primary" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-nature-primary/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-nature-primary/20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-10 text-center"
                    >
                        <p className="text-[10px] text-nature-wood/40 font-bold tracking-[0.2em] uppercase">
                            POWERED BY <span className="text-nature-forest/80">DEEP CORE AI</span> • ENCRYPTED GATEWAY
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
