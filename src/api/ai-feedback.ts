import { toast } from "@/components/ui/use-toast";

export const getAIFeedback = async (prompt: string) => {
  try {
    // For demo purposes, return a simulated response
    // In production, this would call the actual OpenAI API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    return {
      feedback: "Great job maintaining multiple accounts! Your savings show good financial planning. Consider setting up automatic transfers to boost your savings even further while maintaining your current responsible spending habits."
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