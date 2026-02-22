"""
CareerFlow Resume Analysis Service
Uses Groq API with 2 AI Agents:
- Agent 1: Skill Gap Analyzer
- Agent 2: Compatibility Evaluator
"""

import pdfplumber
import docx
import json
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env.local'))

# Groq API Configuration
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]  # Using valid Groq models

# ============================================
# TEXT EXTRACTION
# ============================================

def extract_text(file_path: str) -> str:
    """Extract text from PDF, DOCX, or TXT files."""
    if file_path.endswith(".pdf"):
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                if page.extract_text():
                    text += page.extract_text() + "\n"
        return text
    
    elif file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    
    elif file_path.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    
    return ""

# ============================================
# GROQ API CALL
# ============================================

def call_groq(system_prompt: str, user_prompt: str) -> dict:
    """Call Groq API with fallback models using requests."""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    for model in GROQ_MODELS:
        try:
            print(f"[Groq] Trying model: {model}")
            
            payload = {
                "model": model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "temperature": 0,
                "response_format": {"type": "json_object"}
            }
            
            response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=60)
            response.raise_for_status()
            
            result = response.json()
            content = result["choices"][0]["message"]["content"]
            print(f"[Groq] Success with {model}")
            return json.loads(content)
            
        except Exception as e:
            print(f"[Groq] Error with {model}: {e}")
            continue
    
    print("[Groq] All models failed")
    return {}

# ============================================
# AGENT 1: Skill Gap Analyzer
# ============================================

def run_agent1(resume_json: dict, jd_json: dict) -> dict:
    """Agent 1: Analyze skill gaps between resume and JD."""
    
    system_prompt = """You are Agent 1: Skill Gap Analyzer in an AI-powered ATS system.

Your task:
Compare the candidate resume JSON with the job description JSON and identify skill gaps.

Rules:
- Use ONLY the provided JSON inputs
- Do NOT invent skills
- Compare skills semantically (e.g., "ML" ≈ "Machine Learning")
- Separate analysis into Technical Skills and Soft Skills
- Mark skills as:
  - matched
  - missing
  - extra (present in resume but not required)
- Output ONLY valid JSON in the specified structure."""

    user_prompt = f"""Input Resume JSON:
{json.dumps(resume_json, indent=2)}

Input Job Description JSON:
{json.dumps(jd_json, indent=2)}

Output ONLY valid JSON in the following structure:
{{
  "technical_skills": {{
    "matched": [],
    "missing": [],
    "extra": []
  }},
  "soft_skills": {{
    "matched": [],
    "missing": [],
    "extra": []
  }},
  "skill_gap_summary": "One short paragraph summarizing the skill gaps"
}}"""

    result = call_groq(system_prompt, user_prompt)
    
    # Fallback if empty
    if not result:
        result = {
            "technical_skills": {"matched": [], "missing": [], "extra": []},
            "soft_skills": {"matched": [], "missing": [], "extra": []},
            "skill_gap_summary": "Unable to analyze skills."
        }
    
    return result

# ============================================
# AGENT 2: Compatibility Evaluator
# ============================================

def run_agent2(resume_json: dict, jd_json: dict, skill_gap: dict) -> dict:
    """Agent 2: Evaluate overall compatibility."""
    
    system_prompt = """You are Agent 2: Resume–JD Compatibility Evaluator.

Your task:
Evaluate the overall compatibility of a candidate for the role based on:
- Resume JSON
- Job Description JSON
- Skill gap analysis from Agent 1

Rules:
- Do NOT repeat raw resume data
- Provide clear reasoning
- Assign realistic scores (0-100)
- Be unbiased and professional
- Output ONLY valid JSON in the specified structure."""

    user_prompt = f"""Resume JSON:
{json.dumps(resume_json, indent=2)}

Job Description JSON:
{json.dumps(jd_json, indent=2)}

Skill Gap Analysis (from Agent 1):
{json.dumps(skill_gap, indent=2)}

Output JSON structure:
{{
  "scores": {{
    "technical_skill_match": 0,
    "soft_skill_match": 0,
    "experience_relevance": 0,
    "project_relevance": 0,
    "overall_compatibility": 0
  }},
  "strengths": [],
  "weaknesses": [],
  "final_verdict": "Strong Fit / Moderate Fit / Weak Fit",
  "reasoning": "Concise explanation for the verdict"
}}"""

    result = call_groq(system_prompt, user_prompt)
    
    # Fallback if empty
    if not result or "scores" not in result:
        matched = len(skill_gap.get("technical_skills", {}).get("matched", []))
        missing = len(skill_gap.get("technical_skills", {}).get("missing", []))
        total = matched + missing
        score = int((matched / total * 100)) if total > 0 else 50
        
        result = {
            "scores": {
                "technical_skill_match": score,
                "soft_skill_match": 50,
                "experience_relevance": 50,
                "project_relevance": 50,
                "overall_compatibility": score
            },
            "strengths": skill_gap.get("technical_skills", {}).get("matched", [])[:3],
            "weaknesses": skill_gap.get("technical_skills", {}).get("missing", [])[:3],
            "final_verdict": "Moderate Fit",
            "reasoning": f"Based on skill analysis: {matched} matched, {missing} missing."
        }
    
    return result

# ============================================
# AGENT 3: CV Improvement Suggestions
# ============================================

def run_agent3(resume_json: dict, jd_json: dict, skill_gap: dict, evaluation: dict) -> dict:
    """Agent 3: Generate actionable CV improvement suggestions."""
    
    system_prompt = """You are Agent 3: Career Coach & Resume Advisor.

Your task:
Based on the resume, job description, skill gaps, and evaluation, provide 3 specific, actionable suggestions to improve the candidate's CV/resume.

Rules:
- Be SPECIFIC and ACTIONABLE (not vague like "improve your skills")
- Focus on RESUME improvements, not general career advice
- Include concrete examples (e.g., "Add metrics like '20% revenue increase'")
- Prioritize by impact: High, Medium, Low
- Output ONLY valid JSON."""

    user_prompt = f"""Resume Summary:
{resume_json.get('raw_text', '')[:2500]}

Job Requirements:
{jd_json.get('raw_text', '')[:1500]}

Missing Skills: {skill_gap.get('technical_skills', {}).get('missing', [])}
Matched Skills: {skill_gap.get('technical_skills', {}).get('matched', [])}
Key Weaknesses: {evaluation.get('weaknesses', [])}

Generate 3 actionable CV improvement suggestions:
{{
  "actions": [
    {{"title": "Action title", "details": "Specific advice", "priority": "High"}},
    {{"title": "Action title", "details": "Specific advice", "priority": "Medium"}},
    {{"title": "Action title", "details": "Specific advice", "priority": "Low"}}
  ]
}}"""

    result = call_groq(system_prompt, user_prompt)
    
    # Fallback if empty
    if not result or "actions" not in result:
        missing = skill_gap.get("technical_skills", {}).get("missing", [])
        result = {
            "actions": [
                {
                    "title": f"Add {missing[0] if missing else 'required skills'} to resume",
                    "details": f"Include {missing[0] if missing else 'key technical skills'} in your skills section or demonstrate it in project descriptions.",
                    "priority": "High"
                },
                {
                    "title": "Quantify your achievements",
                    "details": "Add metrics like '20% increase', '50+ users', '$100K saved' to your bullet points.",
                    "priority": "Medium"
                },
                {
                    "title": "Tailor your summary",
                    "details": "Update your professional summary to match the job's key requirements.",
                    "priority": "Low"
                }
            ]
        }
    
    return result

# ============================================
# MAIN ANALYSIS FUNCTION
# ============================================

def analyze_resume(file_path: str, job_description: str) -> dict:
    """
    Main analysis pipeline:
    1. Extract text from resume
    2. Parse resume and JD into structured JSON
    3. Run Agent 1: Skill Gap Analysis
    4. Run Agent 2: Compatibility Evaluation
    5. Return combined results
    """
    print(f"[Analysis] Starting for: {file_path}")
    
    # 1. Extract resume text
    resume_text = extract_text(file_path)
    if not resume_text.strip():
        raise ValueError("Could not extract text from resume")
    
    print(f"[Analysis] Extracted {len(resume_text)} characters")
    
    # 2. Create simple JSON structures
    # In a production system, you'd use another AI call to parse these
    resume_json = {
        "raw_text": resume_text[:5000],  # Truncate for API limits
        "source": "resume"
    }
    
    jd_json = {
        "raw_text": job_description,
        "source": "job_description"
    }
    
    # Extract job role from JD (simple heuristic - first line or title pattern)
    jd_lines = job_description.strip().split('\n')
    job_role = "Target Role"
    for line in jd_lines[:5]:  # Check first 5 lines
        line = line.strip()
        if line and len(line) < 80:  # Likely a title if short
            # Common patterns: "Job Title: X", "Position: X", just "X"
            if ':' in line:
                job_role = line.split(':', 1)[-1].strip()
            else:
                job_role = line
            break
    
    # 3. Agent 1: Skill Gap Analysis
    print("[Analysis] Running Agent 1: Skill Gap Analyzer...")
    skill_gap = run_agent1(resume_json, jd_json)
    print(f"[Agent 1] Matched: {len(skill_gap.get('technical_skills', {}).get('matched', []))}")
    print(f"[Agent 1] Missing: {len(skill_gap.get('technical_skills', {}).get('missing', []))}")
    
    # 4. Agent 2: Compatibility Evaluation
    print("[Analysis] Running Agent 2: Compatibility Evaluator...")
    evaluation = run_agent2(resume_json, jd_json, skill_gap)
    print(f"[Agent 2] Overall Score: {evaluation.get('scores', {}).get('overall_compatibility', 0)}%")
    
    # 5. Agent 3: CV Improvement Suggestions
    print("[Analysis] Running Agent 3: CV Improvement Advisor...")
    suggestions = run_agent3(resume_json, jd_json, skill_gap, evaluation)
    print(f"[Agent 3] Generated {len(suggestions.get('actions', []))} suggestions")
    
    # Calculate Exact Match Percentage deterministically
    tech_matched = len(skill_gap.get('technical_skills', {}).get('matched', []))
    tech_missing = len(skill_gap.get('technical_skills', {}).get('missing', []))
    
    soft_matched = len(skill_gap.get('soft_skills', {}).get('matched', []))
    soft_missing = len(skill_gap.get('soft_skills', {}).get('missing', []))

    total_matched = tech_matched + soft_matched
    total_missing = tech_missing + soft_missing
    total_required = total_matched + total_missing
    
    # Avoid division by zero if somehow no skills were extracted
    exact_match_score = int((total_matched / total_required) * 100) if total_required > 0 else 0
    
    # 6. Combine results for frontend
    result = {
        "readinessScore": exact_match_score,
        "jobRole": job_role,
        "skills": [],
        "feedback": [],
        "summary": evaluation.get("reasoning", "Analysis complete."),
        "actions": suggestions.get("actions", []),
        
        # Raw agent outputs for debugging
        "agent1_output": skill_gap,
        "agent2_output": evaluation,
        "agent3_output": suggestions
    }
    
    # Transform skills for frontend display
    for skill in skill_gap.get("technical_skills", {}).get("matched", []):
        result["skills"].append({
            "name": skill,
            "status": "Strong",
            "category": "Technical",
            "reasoning": "Matched with job requirements"
        })
    
    for skill in skill_gap.get("technical_skills", {}).get("missing", []):
        result["skills"].append({
            "name": skill,
            "status": "Missing" if "Missing" in ["Strong", "Developing", "Missing"] else "To Build",
            "category": "Technical",
            "reasoning": "Required by JD but not found in resume",
            "improvementTip": f"Consider learning {skill}"
        })
    
    # Add feedback
    result["feedback"].append({
        "section": "Skill Gap Analysis",
        "content": skill_gap.get("skill_gap_summary", ""),
        "type": "improvement"
    })
    
    result["feedback"].append({
        "section": "Overall Assessment",
        "content": evaluation.get("reasoning", ""),
        "type": "strength" if evaluation.get("scores", {}).get("overall_compatibility", 0) >= 60 else "improvement"
    })
    
    print("[Analysis] Complete!")
    return result
