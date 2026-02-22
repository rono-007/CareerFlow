export interface UserProfile {
  name: string;
  role: string;
}

export enum SkillStatus {
  STRONG = 'Strong',
  DEVELOPING = 'Developing',
  MISSING = 'To Build'
}

export interface Skill {
  name: string;
  status: SkillStatus;
  category: 'Technical' | 'Soft' | 'Domain';
  reasoning?: string;
  context?: string; // Where it appears in resume
  improvementTip?: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  candidatesCount: number;
  stage: 'Draft' | 'Active' | 'Closed';
  matchScore?: number;
}

export interface Candidate {
  id: string; // Anonymous ID
  score: number; // 0-100
  topSkills: string[];
  confidence: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Reviewing' | 'Interview' | 'Rejected';
  summary: string;
}

export interface AnalysisResult {
  readinessScore: number;
  skills: Skill[];
  feedback: {
    section: string;
    content: string;
    type: 'strength' | 'improvement';
  }[];
  summary: string;
}

// Gemini specific types
export interface GeminiResponse {
  text: string;
}
