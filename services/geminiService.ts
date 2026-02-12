import { GoogleGenAI, Type } from "@google/genai";
import { Language, Company, LandingPageContent } from "../types";
import { addApiTask } from "../utils/apiQueue";
import { stripHtml, addMarkdownFormatting } from "../utils/formatters";

export type RewriteInstruction = 'improve' | 'shorten' | 'lengthen' | 'social_clean';

const performAiCall = async (modelName: string, contents: any, config?: any) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({ model: modelName, contents: contents, config: config });
        if (!response || !response.text) throw new Error("AI returnerede intet indhold.");
        return response;
    } catch (error: any) { throw error; }
};

export const analyzeMediaForTags = async (imageBase64: string, mimeType: string, language: string): Promise<string[]> => {
    const langName = language === 'da' ? 'Danish' : (language === 'de' ? 'German' : 'English');
    const prompt = `Analyze image. Identify 5-8 primary subjects. Output as comma-separated tags in ${langName}.`;
    return addApiTask(async () => {
        try {
            const response = await performAiCall('gemini-3-flash-preview', {
                parts: [
                    { inlineData: { data: imageBase64, mimeType: mimeType } },
                    { text: prompt }
                ]
            }, { temperature: 0.1 });
            return response.text.split(',').map(t => t.trim()).filter(t => t.length > 0);
        } catch (error) { return []; }
    });
};

export const generateSocialPost = async (topic: string, platform: string, language: string, partnerName: string, companyName: string = '', companyDna: string = '', isCompanySelf: boolean = false, visualTags: string[] = []): Promise<string> => {
  const langName = language === 'da' ? 'Danish' : (language === 'de' ? 'German' : 'English');
  const visualContext = visualTags.length > 0 ? `The post features: ${visualTags.join(', ')}.` : '';
  const prompt = `Role: Social Media Manager. Platform: ${platform}. Topic: "${topic}". ${visualContext} Language: ${langName}. ${isCompanySelf ? `Brand: ${companyName}. DNA: ${companyDna}` : `Partner: ${partnerName}. Collaboration with ${companyName}.`} Rules: High engagement hook, value-driven body, clear CTA. Plain text ONLY.`;
  return addApiTask(async () => {
    try {
      const response = await performAiCall('gemini-3-flash-preview', prompt, { temperature: 0.7 });
      return response.text.trim();
    } catch (error) { return ''; }
  });
};

export const rewriteText = async (originalText: string, instruction: RewriteInstruction, language: Language, isSocial: boolean = false): Promise<string> => {
  const langName = language === 'da' ? 'Danish' : (language === 'de' ? 'German' : 'English');
  let task = instruction === 'shorten' ? 'Make this text concise.' : (instruction === 'lengthen' ? 'Expand detail.' : 'Rewrite professional.');
  const prompt = `Role: Content Strategist. Task: ${task} Target Language: ${langName}. Formatting: ${isSocial ? 'Plain text, no markdown.' : 'Standard Markdown.'} Text: "${originalText}"`;
  return addApiTask(async () => {
    const response = await performAiCall('gemini-3-flash-preview', prompt, { temperature: 0.3 });
    return isSocial ? stripHtml(response.text) : response.text;
  });
};

export const generateContentStrategy = async (company: Company, goals: string, duration: string, language: Language): Promise<string> => {
    const langName = language === 'da' ? 'Danish' : 'English';
    const prompt = `Strategic Marketing Director. Strategy for ${company.name} (${duration}). Goals: ${goals}. Language: ${langName}. Markdown format.`;
    return addApiTask(async () => {
        const response = await performAiCall('gemini-3-pro-preview', prompt, { temperature: 0.4 });
        return addMarkdownFormatting(response.text);
    });
};
