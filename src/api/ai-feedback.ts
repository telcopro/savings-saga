import OpenAI from "openai";
import { toast } from "@/components/ui/use-toast";

const openai = new OpenAI({
  apiKey: "sk_placeholder_replace_with_actual_key", // Replace with your actual OpenAI API key
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
});

export const getAIFeedback = async (prompt: string, language: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a friendly and encouraging customer service agent at a bank. Please provide analysis and advice in ${language}. Keep responses concise (3-4 sentences) and focus on positive aspects while giving gentle suggestions for improvement.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return {
      feedback: completion.choices[0].message.content || "No feedback available."
    };
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to get AI feedback. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};