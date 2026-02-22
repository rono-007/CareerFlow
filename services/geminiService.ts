import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SkillStatus } from "../types";

// Initialize Gemini Client
// In a real app, ensure process.env.API_KEY is handled securely.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeResume = async (resumeText: string, targetRole: string): Promise<AnalysisResult> => {
    if (!apiKey) {
        console.warn("No API Key provided. Returning mock data.");
        return getMockAnalysis();
    }

    try {
        const prompt = `
      You are a premium career coach. Analyze this resume text for the role of "${targetRole}".
      Provide a calm, objective, and encouraging assessment.
      
      Return JSON with:
      - readinessScore (0-100 integer)
      - summary (2-3 sentences, warm and professional tone)
      - skills: Array of objects with name, status (Strong, Developing, To Build), category (Technical, Soft, Domain), reasoning, context (where found in resume), improvementTip.
      - feedback: Array of objects with section (e.g., "Summary", "Experience"), content, type (strength or improvement).

      Resume Text:
      "${resumeText.substring(0, 5000)}" 
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        readinessScore: { type: Type.INTEGER },
                        summary: { type: Type.STRING },
                        skills: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    status: { type: Type.STRING },
                                    category: { type: Type.STRING },
                                    reasoning: { type: Type.STRING },
                                    context: { type: Type.STRING },
                                    improvementTip: { type: Type.STRING },
                                }
                            }
                        },
                        feedback: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    section: { type: Type.STRING },
                                    content: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                }
                            }
                        }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");

        // The response is already validated by schema, so we can parse directly.
        return JSON.parse(text) as AnalysisResult;

    } catch (error) {
        console.error("Gemini Analysis Failed:", error);
        return getMockAnalysis();
    }
};

export const generateJobDescription = async (title: string, rawInput: string) => {
    if (!apiKey) return "SAMPLE JD: \n\n" + rawInput;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Draft a professional, inclusive Job Description for a ${title}. Base it on these notes: ${rawInput}. Keep the tone human, engaging, and precise.`,
        });
        return response.text;
    } catch (e) {
        return rawInput;
    }
};

// Fallback for demo without API Key
const getMockAnalysis = (): AnalysisResult => ({
    readinessScore: 78,
    summary: "You have a solid foundation for this role, particularly in technical execution. Your experience with React is evident, though aligning your leadership examples with the senior level requirements would strengthen your profile.",
    skills: [
        { name: "React / Frontend", status: SkillStatus.STRONG, category: "Technical", reasoning: "Extensive projects listed.", context: "Work Experience: 2020-Present", improvementTip: "Keep updated with React 19 features." },
        { name: "System Design", status: SkillStatus.DEVELOPING, category: "Technical", reasoning: "Mentioned, but lacks specific architectural examples.", context: "Skills Section", improvementTip: "Add a case study of a system you scaled." },
        { name: "Team Leadership", status: SkillStatus.MISSING, category: "Soft", reasoning: "No direct mentoring experience found.", context: "N/A", improvementTip: "Highlight any informal mentoring or code review leadership." },
        { name: "TypeScript", status: SkillStatus.STRONG, category: "Technical", reasoning: "Used in multiple production apps.", context: "Projects", improvementTip: "" },
    ],
    feedback: [
        { section: "Summary", content: "Your professional summary is concise but could be more results-oriented.", type: "improvement" },
        { section: "Experience", content: "Great use of action verbs like 'Architected' and 'Deployed'.", type: "strength" }
    ]
});
