import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, ShieldCheck, User, Home, ChevronDown } from 'lucide-react';

// Landing Page
import Landing from './pages/Landing';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import ResumeUpload from './pages/student/ResumeUpload';
import SkillGap from './pages/student/SkillGap';
import ResumeFeedback from './pages/student/ResumeFeedback';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import CreateJob from './pages/recruiter/CreateJob';
import CandidateRanking from './pages/recruiter/CandidateRanking';
import CandidateDetail from './pages/recruiter/CandidateDetail';

// Admin Pages
import AdminOverview from './pages/admin/Overview';
import FairnessBias from './pages/admin/Fairness';
import AuthPage from './pages/AuthPage';

const Navigation = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  if (isLanding || isAuth) return null;

  const isStudent = location.pathname.includes('/student');
  const isRecruiter = location.pathname.includes('/recruiter');
  const isAdmin = location.pathname.includes('/admin');

  const navClass = (isActive: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${isActive
      ? 'bg-stone-800 text-white shadow-sm'
      : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
    }`;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-stone-200 p-2 rounded-full shadow-lg z-50 flex gap-1 animate-fadeIn">
      {isStudent && (
        <>
          <NavLink to="/student/dashboard" className={({ isActive }) => navClass(isActive)}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink to="/student/upload" className={({ isActive }) => navClass(isActive)}>
            <FileText size={16} /> Resume
          </NavLink>
          <NavLink to="/student/gap-analysis" className={({ isActive }) => navClass(isActive)}>
            <User size={16} /> Skills
          </NavLink>
        </>
      )}

      {isRecruiter && (
        <>
          <NavLink to="/recruiter/dashboard" className={({ isActive }) => navClass(isActive)}>
            <Briefcase size={16} /> Jobs
          </NavLink>
          <NavLink to="/recruiter/create-job" className={({ isActive }) => navClass(isActive)}>
            <FileText size={16} /> Draft JD
          </NavLink>
        </>
      )}

      {isAdmin && (
        <>
          <NavLink to="/admin/overview" className={({ isActive }) => navClass(isActive)}>
            <ShieldCheck size={16} /> System
          </NavLink>
          <NavLink to="/admin/fairness" className={({ isActive }) => navClass(isActive)}>
            Bias Check
          </NavLink>
        </>
      )}
    </nav>
  );
};

const PortalSwitcher = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (isLanding || isAuth) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fadeIn" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isOpen
          ? 'border-stone-400 text-stone-900 ring-2 ring-stone-100'
          : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
          }`}
      >
        Switch Portal
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-100 rounded-xl shadow-xl p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) => `block px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}
            onClick={() => setIsOpen(false)}
          >
            Student
          </NavLink>
          <NavLink
            to="/recruiter/dashboard"
            className={({ isActive }) => `block px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}
            onClick={() => setIsOpen(false)}
          >
            Recruiter
          </NavLink>
          <NavLink
            to="/admin/overview"
            className={({ isActive }) => `block px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}
            onClick={() => setIsOpen(false)}
          >
            Admin
          </NavLink>
        </div>
      )}
    </div>
  );
};

const HomeLink = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  if (isLanding || isAuth) return null;

  return (
    <NavLink
      to="/"
      className="fixed top-6 left-6 z-50 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-2 animate-fadeIn hover:shadow-md"
    >
      <Home size={16} className="text-stone-400" />
      <span className="font-semibold text-stone-800">CareerFlow</span>
    </NavLink>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  return (
    <div className={`min-h-screen font-sans selection:bg-nature-leaf/30 selection:text-nature-forest ${isLanding ? 'bg-white' : isAuth ? 'bg-transparent' : 'bg-stone-50'} overflow-x-hidden`}>
      <HomeLink />
      <PortalSwitcher />

      {/* 
          Layout Logic:
          - Landing Page: Full width (w-full), no extra padding, let the page handle its own layout.
          - Auth Page: Managed by component.
          - App Pages: Constrained width (max-w-7xl) with standard padding.
      */}
      <div className={isLanding || isAuth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/upload" element={<ResumeUpload />} />
          <Route path="/student/gap-analysis" element={<SkillGap />} />
          <Route path="/student/feedback" element={<ResumeFeedback />} />

          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/create-job" element={<CreateJob />} />
          <Route path="/recruiter/ranking/:jobId" element={<CandidateRanking />} />
          <Route path="/recruiter/candidate/:candidateId" element={<CandidateDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/fairness" element={<FairnessBias />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Navigation />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
