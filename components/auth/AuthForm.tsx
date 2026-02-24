import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Briefcase, GraduationCap, Code, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface AuthFormProps {
    role: 'student' | 'recruiter';
}

const InputField = ({ label, icon: Icon, type = "text", placeholder, options }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="space-y-1.5 w-full group/input">
            <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold text-nature-forest/40 uppercase tracking-[0.15em] transition-colors group-focus-within/input:text-nature-primary/70">{label}</label>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isFocused ? 1 : 0 }}
                    className="w-1 h-1 rounded-full bg-nature-primary"
                />
            </div>
            <div className={`relative transition-all duration-500 ease-[0.16,1,0.3,1] ${isFocused ? 'scale-[1.02] -translate-y-1' : ''}`}>
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-500 z-10 ${isFocused ? 'text-nature-primary' : 'text-nature-wood/30'}`}>
                    <Icon size={18} strokeWidth={isFocused ? 2.5 : 2} />
                </div>

                {options ? (
                    <select
                        className="w-full bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-nature-primary/5 focus:border-nature-primary/40 transition-all appearance-none text-nature-forest font-semibold shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                        <option value="" disabled selected>{placeholder}</option>
                        {options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-nature-primary/5 focus:border-nature-primary/40 transition-all text-nature-forest placeholder:text-nature-wood/20 font-semibold shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                )}
            </div>
        </div>
    );
};

const AuthForm: React.FC<AuthFormProps> = ({ role }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
        }, 1500);
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <motion.h2
                    className="text-3xl font-bold text-nature-forest mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={isLogin ? 'login-title' : 'signup-title'}
                >
                    {isLogin ? "Welcome back!" : "Start your journey"}
                </motion.h2>
                <p className="text-nature-wood/60 text-sm leading-relaxed max-w-[300px] mx-auto">
                    {isLogin
                        ? "Simplify your workflow and boost your productivity with CareerFlow AI."
                        : "Join our network and unlock access to premium career opportunities."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                    {!isLogin ? (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-5"
                            key="signup-fields"
                        >
                            <InputField label="Full Name" icon={User} placeholder="John Doe" />

                            {role === 'recruiter' && (
                                <InputField label="Company Name" icon={Briefcase} placeholder="Your Company" />
                            )}

                            <InputField label="Email" icon={Mail} type="email" placeholder="name@example.com" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="Password" icon={Lock} type="password" placeholder="••••••••" />
                                <InputField label="Confirm" icon={Lock} type="password" placeholder="••••••••" />
                            </div>

                            {role === 'student' ? (
                                <>
                                    <InputField label="College / University" icon={GraduationCap} placeholder="University Name (Optional)" />
                                    <InputField
                                        label="Primary Skill"
                                        icon={Code}
                                        placeholder="Select Skill"
                                        options={['Fullstack Dev', 'AI/ML Engineer', 'UI/UX Designer', 'Data Science', 'Backend Architecture']}
                                    />
                                </>
                            ) : (
                                <InputField
                                    label="Hiring Role Type"
                                    icon={Briefcase}
                                    placeholder="Select Focus"
                                    options={['Tech/Engineering', 'Design', 'Product Management', 'Sales/Marketing', 'Executive']}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-5"
                            key="login-fields"
                        >
                            <InputField label="Email" icon={Mail} type="email" placeholder="name@example.com" />
                            <div className="space-y-1">
                                <InputField label="Password" icon={Lock} type="password" placeholder="••••••••" />
                                <div className="text-right">
                                    <a href="#" className="text-xs font-semibold text-nature-primary hover:text-nature-forest transition-colors underline-offset-4 hover:underline">Forgot password?</a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-nature-primary/20 transition-all flex items-center justify-center gap-2 overflow-hidden relative ${isSuccess ? 'bg-nature-forest' : 'bg-nature-primary hover:bg-nature-forest'
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : isSuccess ? (
                        <>
                            <CheckCircle2 className="animate-bounce" />
                            <span>Success!</span>
                        </>
                    ) : (
                        <>
                            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}

                    <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </motion.button>
            </form>

            {/* Social Login Section - Matching the reference image */}
            <div className="mt-10">
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-nature-forest/5"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="bg-white/0 px-4 text-nature-wood/40">or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    {[
                        { icon: 'G', label: 'Google' },
                        { icon: 'A', label: 'Apple' },
                        { icon: 'O', label: 'Other' }
                    ].map((platform, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -4, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-white border border-nature-forest/5 shadow-sm flex items-center justify-center text-lg font-bold text-nature-forest hover:bg-nature-primary hover:text-white transition-colors duration-300"
                        >
                            {platform.icon}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center pt-6">
                <p className="text-nature-wood/60 text-sm font-medium">
                    {isLogin ? "Not a member?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-2 text-nature-primary font-bold hover:text-nature-forest transition-colors hover:underline"
                    >
                        {isLogin ? "Register now" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
