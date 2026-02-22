import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Layout,
  Clock,
  Users,
  CheckSquare,
  Mail,
  Linkedin,
  Github,
  Command,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';

const GrainOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.08] mix-blend-multiply transition-opacity duration-700">
    <div className="absolute inset-[-200%] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+CiAgICA8ZmVUdXJidWxlbmNlIAogICAgICB0eXBlPSJmcmFjdGFsTm9pc2UiIAogICAgICBiYXNlRnJlcXVlbmN5PSIwLjY1IiAKICAgICAgbnVtT2N0YXZlcz0iMyIgCiAgICAgIHN0aWNoVGlsZXM9InN0aWNoIi8+CiAgPC9maWx0ZXI+CiAgCiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlRmlsdGVyKSIvPgo8L3N2Zz4=')] animate-grain contrast-[1.5]"></div>
  </div>
);

const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-stone-50/50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-3 pl-6 py-2 flex items-center justify-between transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-stone-900 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12 group-hover:scale-110 shadow-lg">
            <Command size={16} />
          </div>
          <span className="font-semibold text-lg text-stone-900 tracking-tight font-serif">CareerFlow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#features" className="hover:text-stone-900 transition-colors hover:scale-105 transform inline-block">Features</a>
          <Link to="/student/gap-analysis" className="hover:text-stone-900 transition-colors hover:scale-105 transform inline-block">Skills Gap</Link>
          <Link to="/recruiter/dashboard" className="hover:text-stone-900 transition-colors hover:scale-105 transform inline-block">For Recruiters</Link>
          <Link to="/admin/fairness" className="hover:text-stone-900 transition-colors hover:scale-105 transform inline-block font-mono">Fairness.AI</Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/student/dashboard" className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/50 rounded-full transition-all">Sign in</Link>
          <Link
            to="/student/dashboard"
            className="px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-stone-100/50 text-stone-600 hover:bg-stone-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full mt-3 left-0 w-full bg-white/80 backdrop-blur-xl border border-white/50 p-6 shadow-2xl rounded-3xl">
          <div className="flex flex-col gap-4 text-base font-medium text-stone-600 text-center">
            <a href="#features" className="hover:text-stone-900" onClick={() => setIsOpen(false)}>Features</a>
            <Link to="/student/gap-analysis" className="hover:text-stone-900" onClick={() => setIsOpen(false)}>Skills Gap</Link>
            <Link to="/recruiter/dashboard" className="hover:text-stone-900" onClick={() => setIsOpen(false)}>For Recruiters</Link>
            <Link to="/admin/fairness" className="hover:text-stone-900" onClick={() => setIsOpen(false)}>Fairness AI</Link>
            <hr className="border-stone-200/50 my-2" />
            <Link to="/student/dashboard" className="text-stone-900" onClick={() => setIsOpen(false)}>Sign in</Link>
            <Link to="/student/dashboard" className="bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-lg" onClick={() => setIsOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const FloatingWidget_StickyNote = () => (
  <div className="absolute top-[15%] left-[3%] md:left-[5%] w-40 md:w-48 bg-[#fef08a] rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rotate-[-6deg] p-4 md:p-6 font-handwriting transform hover:scale-110 hover:rotate-[-8deg] transition-all duration-300 hidden lg:block z-10 animate-float-slow cursor-help origin-center">
    <div className="w-3 h-3 rounded-full bg-red-400 mx-auto -mt-6 md:-mt-8 mb-4 shadow-sm border border-red-500/20"></div>
    <p className="text-stone-800 font-medium leading-relaxed text-sm md:text-lg">
      Update resume with recent React project metrics.
    </p>
    <p className="text-stone-800 font-medium leading-relaxed text-sm md:text-lg mt-2 opacity-80">
      Draft cover letter for TechCorp.
    </p>
  </div>
);

const FloatingWidget_Calendar = () => (
  <div className="absolute top-[18%] right-[4%] md:right-[6%] bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-100 rotate-[3deg] w-56 md:w-64 hidden lg:block z-10 animate-float-delayed hover:rotate-[0deg] transition-all duration-300 hover:scale-105 cursor-pointer group">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Reminders</span>
      <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse group-hover:scale-150 transition-transform"></div>
    </div>
    <div className="bg-stone-50 rounded-xl p-3 mb-2 border border-stone-100 group-hover:bg-stone-100 transition-colors">
      <p className="text-[10px] text-stone-500 mb-1 font-mono">Today's Interview</p>
      <p className="text-sm font-medium text-stone-800 font-serif">Product Manager Role</p>
      <div className="flex items-center gap-2 mt-2 text-[10px] text-sage-600 bg-sage-50 px-2 py-1 rounded w-fit font-mono">
        <Clock size={10} /> 14:00 - 15:00
      </div>
    </div>
  </div>
);

const FloatingWidget_Tasks = () => (
  <div className="absolute bottom-[10%] left-[5%] lg:left-[8%] bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-100 rotate-[2deg] w-64 md:w-72 hidden xl:block z-10 animate-float hover:rotate-[0deg] transition-all duration-300 hover:scale-105 cursor-default">
    <p className="font-semibold text-stone-800 mb-4 flex items-center gap-2 font-serif">
      <CheckSquare size={16} className="text-sage-500" /> Today's progress
    </p>
    <div className="space-y-4 font-mono uppercase">
      <div className="group cursor-pointer">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-medium text-stone-700 group-hover:text-sage-700 transition-colors underline decoration-sage-200 underline-offset-4">Refine Portfolio</span>
          <span className="text-stone-400">60%</span>
        </div>
        <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-stone-800 w-[60%] rounded-full group-hover:bg-sage-600 transition-colors"></div>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-medium text-stone-700 group-hover:text-blue-700 transition-colors">SQL Cert</span>
          <span className="text-stone-400">12%</span>
        </div>
        <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[12%] rounded-full group-hover:bg-blue-600 transition-colors"></div>
        </div>
      </div>
    </div>
  </div>
);

const FloatingWidget_MatchBadge = () => (
  <div className="absolute top-[45%] right-[2%] bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 w-44 hidden xl:block z-20 animate-float-slow hover:scale-110 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center text-white shadow-lg font-mono text-sm font-bold group-hover:rotate-12 transition-transform">
        98%
      </div>
      <div>
        <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest font-mono">Job Match</p>
        <p className="text-xs font-serif text-stone-800 italic">Senior Designer</p>
      </div>
    </div>
  </div>
);

const FloatingWidget_LiveStatus = () => (
  <div className="absolute top-[35%] left-[8%] bg-stone-900 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 hidden md:flex z-20 animate-float-delayed border border-white/10 group cursor-none">
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-sage-400 animate-ping absolute inset-0"></div>
      <div className="w-2 h-2 rounded-full bg-sage-500"></div>
    </div>
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono group-hover:text-sage-300 transition-colors">AI Scanning Resume...</span>
  </div>
);

const FloatingWidget_Growth = () => (
  <div className="absolute bottom-[20%] right-[6%] bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 rotate-[-4deg] w-48 hidden lg:block z-10 animate-float-slow hover:rotate-0 transition-all hover:scale-105 group">
    <div className="flex items-center gap-2 mb-2">
      <TrendingUp size={14} className="text-sage-500" />
      <span className="text-[10px] font-bold text-stone-400 font-mono">GROWTH</span>
    </div>
    <p className="text-xs text-stone-600 font-medium">You improved <span className="text-sage-600 font-mono font-bold">+12%</span> in <span className="font-serif">System Design</span> last week</p>
  </div>
);

const FloatingWidget_Integrations = () => (
  <div className="absolute bottom-32 right-[10%] lg:right-[15%] bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-100 -rotate-[3deg] w-fit hidden xl:block z-10 animate-float-slow hover:rotate-[0deg] transition-all duration-300 hover:scale-110 cursor-pointer">
    <p className="text-[10px] font-bold text-stone-400 mb-3 tracking-widest font-mono">PLATFORMS</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors hover:scale-110 shadow-sm"><Linkedin size={20} /></div>
      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors hover:scale-110 shadow-sm"><Mail size={20} /></div>
      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors hover:scale-110 shadow-sm"><Github size={20} /></div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      <DotPattern />

      {/* Floating Elements */}
      <FloatingWidget_StickyNote />
      <FloatingWidget_Calendar />
      <FloatingWidget_Tasks />
      <FloatingWidget_Integrations />
      <FloatingWidget_LiveStatus />
      <FloatingWidget_MatchBadge />
      <FloatingWidget_Growth />

      <div className="relative z-20 max-w-5xl mx-auto text-center">
        {/* Center Logo/Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-100 flex items-center justify-center mx-auto mb-8 md:mb-10 rotate-3 hover:rotate-[360deg] transition-transform duration-700 ease-in-out cursor-pointer group">
          <div className="grid grid-cols-2 gap-2 group-hover:gap-1 transition-all">
            <div className="w-3 h-3 rounded-full bg-sage-500"></div>
            <div className="w-3 h-3 rounded-full bg-stone-800"></div>
            <div className="w-3 h-3 rounded-full bg-stone-400"></div>
            <div className="w-3 h-3 rounded-full bg-stone-200"></div>
          </div>
        </div>

        <h1 className="text-5xl md:text-8xl font-normal text-stone-900 tracking-tight leading-[1] mb-6 md:mb-10 font-serif">
          Think, plan, and build <br className="hidden md:block" />
          <span className="text-stone-300 italic">your career in one place</span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4 font-normal">
          Efficiently manage your resume, track skill gaps, and find the perfect role with <span className="text-stone-900 font-serif">AI-driven guidance</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/student/dashboard"
            className="w-full sm:w-auto px-10 py-5 bg-stone-900 text-white rounded-2xl font-serif text-xl hover:bg-stone-800 transition-all shadow-2xl hover:shadow-stone-200 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
          >
            I'm a Student
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/recruiter/dashboard"
            className="w-full sm:w-auto px-10 py-5 bg-white text-stone-700 border border-stone-200 rounded-2xl font-serif text-xl hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            I'm a Recruiter
          </Link>
        </div>

        {/* Subtle scroll hint */}
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-20">
          <span className="text-[10px] font-bold font-mono tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-stone-900"></div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <span className="px-4 py-1.5 rounded-full border border-stone-200 text-stone-500 text-xs font-medium uppercase tracking-wider bg-white">Solutions</span>
          <h2 className="text-3xl md:text-5xl font-medium text-stone-900 mt-6 tracking-tight">
            Solve your career's <br /> biggest challenges
          </h2>
        </div>

        {/* Feature Cards - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Feature 1 */}
          <div className="p-6 md:p-8 rounded-2xl bg-stone-50 border border-stone-100 group cursor-default transition-all hover:-translate-y-1 duration-300 hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-orange-100">
              <Layout size={28} />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3">Resume Optimization</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              Ensure your resume is always ATS-ready with context-aware analysis and real-time skill mapping directly against the job you want.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 md:p-8 rounded-2xl bg-stone-50 border border-stone-100 group cursor-default transition-all hover:-translate-y-1 duration-300 hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-sm border border-blue-100">
              <CheckSquare size={28} />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3">Skill Prioritization</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              We mathematically calculate what you're missing. Prioritize skill development so you can focus on what matters most for your target role.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 md:p-8 rounded-2xl bg-stone-50 border border-stone-100 group cursor-default transition-all hover:-translate-y-1 duration-300 hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-purple-100">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3">Interview Prep</h3>
            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
              Hold confident interviews without mock practice partners. Our AI asks the exact questions recruiters are trained to ask.
            </p>
          </div>
        </div>

        {/* Dashboard Preview - Always Visible */}
        <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] bg-sage-500 p-3 md:p-12 overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-700">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

          <div className="relative bg-[#f8fafc] rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-white/20 aspect-[16/14] md:aspect-[16/10]">
            {/* Mock Header */}
            <div className="bg-white border-b border-stone-100 p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-stone-100 rounded-lg flex items-center justify-center">
                  <Command size={14} className="text-stone-400" />
                </div>
                <span className="font-semibold text-stone-700 text-xs md:text-base">Student Dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-stone-100"></div>
                <span className="text-xs md:text-sm font-medium text-stone-600 hidden sm:inline">Amanda P.</span>
              </div>
            </div>

            {/* Mock Body */}
            <div className="p-4 md:p-8 grid grid-cols-12 gap-4 md:gap-8 h-full bg-[#fafaf9] overflow-hidden">
              {/* Sidebar Mock */}
              <div className="col-span-2 hidden lg:block space-y-6">
                <div className="space-y-1">
                  {['Home', 'My Resume', 'Applications', 'Analytics'].map((item, i) => (
                    <div key={i} className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Mock */}
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 gap-4 md:gap-6 content-start">
                <div className="col-span-12">
                  <h2 className="text-xl md:text-3xl font-medium text-stone-800 mb-1">Good morning, Amanda</h2>
                  <p className="text-xs md:text-base text-stone-400">Here is your daily career summary</p>
                </div>

                {/* To Do List Card */}
                <div className="col-span-12 lg:col-span-5 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                    <span className="text-lg md:text-xl">✏️</span> To do list
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100 transition-colors cursor-pointer group">
                      <div className="mt-1 w-3 h-3 md:w-4 md:h-4 rounded border border-stone-300 bg-white group-hover:border-sage-500 transition-colors"></div>
                      <p className="text-xs md:text-sm text-stone-600">Review feedback on "System Design" skill gap</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 opacity-60">
                      <div className="mt-1 w-3 h-3 md:w-4 md:h-4 rounded border-sage-500 bg-sage-500 flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                      <p className="text-xs md:text-sm text-stone-400 line-through">Upload updated Resume PDF</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100 transition-colors cursor-pointer group">
                      <div className="mt-1 w-3 h-3 md:w-4 md:h-4 rounded border border-stone-300 bg-white group-hover:border-sage-500 transition-colors"></div>
                      <p className="text-xs md:text-sm text-stone-600">Complete mock interview for PM role</p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group">
                    <div className="flex justify-between w-full mb-4">
                      <span className="text-xs md:text-sm font-medium text-stone-500">Readiness</span>
                      <Users size={16} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
                    </div>
                    <span className="text-3xl md:text-5xl font-mono text-stone-800 tracking-tighter">78%</span>
                    <div className="flex gap-2 mt-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-[10px] md:text-xs font-bold">||</div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg shadow-orange-200">▶</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group">
                    <div className="flex justify-between w-full mb-4">
                      <span className="text-xs md:text-sm font-medium text-stone-500">Activity</span>
                      <span className="text-[10px] md:text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full">weekly</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xl md:text-2xl font-semibold text-stone-800">12/15</p>
                        <p className="text-[10px] md:text-xs text-stone-400">Skills Verified</p>
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-sage-100 border-t-sage-500 rotate-45 transition-transform group-hover:rotate-[225deg] duration-700 ease-in-out"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements on Dashboard */}
          <div className="absolute top-20 -left-12 bg-white p-4 rounded-2xl shadow-xl rotate-[-6deg] hidden lg:block animate-float hover:scale-110 hover:rotate-[-12deg] transition-all duration-300 cursor-help">
            <span className="text-4xl font-bold text-stone-800 font-mono">20</span>
          </div>
          <div className="absolute top-1/2 -right-8 bg-white p-4 rounded-2xl shadow-xl rotate-[12deg] hidden lg:block animate-float-delayed hover:scale-110 hover:rotate-[6deg] transition-all duration-300 cursor-help">
            <div className="w-12 h-12 bg-sage-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sage-200">
              <CheckCircle2 size={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-stone-100 bg-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 gap-4">
      <p>© 2024 CareerFlow AI. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-stone-800 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-stone-800 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-stone-800 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

const Landing: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900 selection:bg-sage-100 overflow-x-hidden relative">
      {/* Inject Keyframe Styles for animations */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

          .font-serif { font-family: 'Playfair Display', serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          .font-handwriting { font-family: 'Caveat', cursive; }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
            50% { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
            50% { transform: translateY(-8px) rotate(var(--tw-rotate, 0deg)); }
          }
           @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--tw-rotate, 0deg)); }
          }
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
          .animate-grain { animation: grain 8s steps(10) infinite; }
       `}</style>
      <GrainOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Landing;