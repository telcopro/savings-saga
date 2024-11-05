import OpenAI from "openai";
import { toast } from "@/components/ui/use-toast";

const getOpenAIInstance = () => {
  const apiKey = sessionStorage.getItem('openai-key');
  if (!apiKey) {
    throw new Error("OpenAI API key not found. Please set it in the admin page.");
  }
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
  });
};

export const getAIFeedback = async (prompt: string, language: string) => {
  try {
    const openai = getOpenAIInstance();
    const languageMap: Record<string, string> = {
      'en': 'English',
      'sv': 'Swedish',
      'de': 'German'
    };
    
    const systemPrompt = `You are a friendly and encouraging customer service agent at a bank. Please provide analysis and advice in ${languageMap[language] || 'English'}. Write your responses as if you are speaking directly to the customer. Provide a comprehensive response of 5-10 sentences, focusing on positive aspects while giving gentle suggestions for improvement.`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    return {
      feedback: completion.choices[0].message.content || "No feedback available.",
      fullPrompt: `System Instructions:\n${systemPrompt}\n\nUser Data:\n${prompt}`
    };
  } catch (error: any) {
    if (error.message.includes("API key not found")) {
      toast({
        title: "API Key Missing",
        description: "Please set your OpenAI API key in the admin page",
        variant: "destructive",
      });
    } else if (error.status === 429 || (error.error?.type === "insufficient_quota")) {
      toast({
        title: "API Quota Exceeded",
        description: "Your OpenAI API key has exceeded its quota. Please check your billing details or use a different key.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to get AI feedback. Please try again later.",
        variant: "destructive",
      });
    }
    throw error;
  }
};