import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2, ArrowRight, FileText, Sparkles, Zap, Target, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const API_URL = "http://localhost:8000";

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState<'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [hasExistingAnalysis, setHasExistingAnalysis] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('analysisResult');
    if (stored) {
      setHasExistingAnalysis(true);
    }
  }, []);

  const handleClearAnalysis = () => {
    if (window.confirm("This will clear your previous analysis. Are you sure you want to start fresh?")) {
      localStorage.removeItem('analysisResult');
      setHasExistingAnalysis(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setErrorMessage("Please upload a resume file.");
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMessage("Please enter a job description.");
      return;
    }

    setErrorMessage("");
    setStep('uploading');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setStep('analyzing');

      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || "Analysis failed");
      }

      const result = await response.json();
      localStorage.setItem('analysisResult', JSON.stringify(result));
      setStep('complete');
    } catch (e: any) {
      console.error("Analysis error:", e);
      setErrorMessage(e.message || "Analysis failed. Please try again.");
      setStep('error');
    }
  };

  // Analyzing state - full screen experience
  if (step === 'analyzing' || step === 'uploading') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-stone-700 border-t-sage-400 animate-spin mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sage-400" size={32} />
          </div>
          <h2 className="text-2xl font-light text-white mt-8 mb-2">
            {step === 'uploading' ? 'Uploading Resume...' : 'AI Agents at Work'}
          </h2>
          <p className="text-stone-400 max-w-sm mx-auto">
            {step === 'analyzing' && 'Three specialized agents are analyzing your resume against the job requirements.'}
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-sage-500/20 flex items-center justify-center mx-auto mb-2 animate-pulse">
                <Target size={18} className="text-sage-400" />
              </div>
              <p className="text-xs text-stone-500">Skill Gap</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-2 animate-pulse delay-300">
                <Zap size={18} className="text-amber-400" />
              </div>
              <p className="text-xs text-stone-500">Compatibility</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-2 animate-pulse delay-500">
                <Sparkles size={18} className="text-rose-400" />
              </div>
              <p className="text-xs text-stone-500">Suggestions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete state
  if (step === 'complete') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-sage-900 via-stone-900 to-stone-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-sage-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 size={48} className="text-sage-400" />
          </div>
          <h2 className="text-3xl font-light text-white mb-2">Analysis Complete!</h2>
          <p className="text-stone-400 mb-8 max-w-md mx-auto">
            We've identified your strengths, skill gaps, and personalized recommendations.
          </p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-900 rounded-full hover:bg-stone-100 transition-all font-medium shadow-2xl hover:shadow-sage-500/20 hover:scale-105"
          >
            View Your Results <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center fade-in">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl font-light text-stone-800 mb-3">
            Match Your Resume to Any Job
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            Our AI agents analyze your skills, identify gaps, and provide actionable recommendations.
          </p>
        </div>

        {/* Existing Analysis Alert */}
        {hasExistingAnalysis && (
          <div className="mb-8 p-4 bg-sage-50 border border-sage-100 rounded-2xl flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <FileText size={20} className="text-sage-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-stone-800">Existing Analysis Found</p>
                <p className="text-xs text-stone-500">Your previous results are currently saved and persistent.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="px-4 py-2 text-xs font-medium text-sage-700 hover:bg-sage-100/50 rounded-lg transition-colors"
              >
                View Results
              </button>
              <button
                onClick={handleClearAnalysis}
                className="px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 size={12} />
                Start Fresh
              </button>
            </div>
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left: Resume Upload */}
          <div
            className={`
              relative bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 text-center 
              border-2 transition-all duration-500 cursor-pointer group overflow-hidden
              ${isDragging ? 'border-sage-400 scale-[1.02]' : file ? 'border-sage-500' : 'border-stone-700'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sage-500/20 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              {!file ? (
                <>
                  <div className="w-20 h-20 bg-stone-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-stone-700 transition-colors">
                    <UploadCloud size={36} className="text-sage-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Drop your resume</h3>
                  <p className="text-stone-400 mb-6 text-sm">PDF, DOCX, or TXT • Max 5MB</p>
                  <label className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 rounded-full font-medium cursor-pointer hover:bg-stone-100 transition-colors shadow-lg">
                    <FileText size={18} />
                    Choose File
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
                  </label>
                </>
              ) : (
                <div className="py-4">
                  <div className="w-16 h-16 bg-sage-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-sage-400" />
                  </div>
                  <p className="text-white font-medium mb-1">{file.name}</p>
                  <p className="text-stone-400 text-sm mb-4">{(file.size / 1024).toFixed(1)} KB</p>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    Remove & Upload Different
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Job Description */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target size={20} className="text-sage-600" />
              <h3 className="font-semibold text-stone-800">Target Job Description</h3>
            </div>
            <textarea
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none text-sm text-stone-700 h-48 resize-none placeholder:text-stone-400"
              placeholder="Paste the job description you're targeting...

Include requirements, responsibilities, and qualifications for best results."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-3 text-xs text-stone-400">
              <Sparkles size={12} />
              <span>Our AI works best with detailed job descriptions</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleAnalyze}
            disabled={!file || !jobDescription.trim()}
            className="inline-flex items-center gap-3 px-10 py-4 bg-stone-900 text-white rounded-full font-medium 
                       hover:bg-stone-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed
                       shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
          >
            <Zap size={20} />
            Analyze with AI
            <ArrowRight size={20} />
          </button>
          <p className="text-xs text-stone-400 mt-4">
            Takes 10-30 seconds • Powered by 3 AI Agents
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target size={20} className="text-sage-600" />
            </div>
            <h4 className="font-medium text-stone-800 text-sm mb-1">Skill Gap Analysis</h4>
            <p className="text-xs text-stone-400">Identify missing skills</p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap size={20} className="text-amber-600" />
            </div>
            <h4 className="font-medium text-stone-800 text-sm mb-1">Match Score</h4>
            <p className="text-xs text-stone-400">See your compatibility</p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles size={20} className="text-rose-600" />
            </div>
            <h4 className="font-medium text-stone-800 text-sm mb-1">AI Suggestions</h4>
            <p className="text-xs text-stone-400">Actionable improvements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
