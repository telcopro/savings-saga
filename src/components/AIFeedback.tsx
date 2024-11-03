import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";
import { useMortgage } from "@/contexts/MortgageContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AIFeedback = () => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { accounts, transactions } = useBanking();
  const { mortgages } = useMortgage();
  const { t } = useLanguage();

  const generatePrompt = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const mortgageBalance = mortgages.reduce((sum, m) => sum + m.remainingBalance, 0);
    
    return `You are a friendly and encouraging customer service agent at a bank. Please provide a positive analysis of this customer's financial situation and give some encouraging advice. Here's their financial data:

Total Balance Across Accounts: $${totalBalance}
Number of Accounts: ${accounts.length}
Mortgage Balance: $${mortgageBalance}
Number of Mortgages: ${mortgages.length}

Account Details:
${accounts.map(acc => `- ${acc.type} Account: $${acc.balance}`).join('\n')}

Recent Transactions:
${transactions.slice(0, 5).map(t => 
  `- ${t.type === 'credit' ? 'Received' : 'Spent'} $${t.amount} - ${t.description}`
).join('\n')}

Please provide a friendly, encouraging response that:
1. Highlights positive aspects of their financial situation
2. Gives gentle suggestions for improvement
3. Encourages good financial habits
4. Keeps an optimistic and supportive tone
5. Is concise (max 3-4 sentences)`;
  };

  const getFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: generatePrompt() }),
      });
      
      if (!response.ok) throw new Error('Failed to get AI feedback');
      
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      // For demo purposes, set a sample response
      setFeedback("Great job maintaining multiple accounts! Your savings show good financial planning. Consider setting up automatic transfers to boost your savings even further while maintaining your current responsible spending habits.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{t('aiFinancialFeedback')}</h2>
      </div>
      
      {feedback ? (
        <div className="space-y-4">
          <p className="text-gray-700">{feedback}</p>
          <Button 
            variant="outline" 
            onClick={() => setFeedback(null)}
            className="w-full"
          >
            {t('getNewFeedback')}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={getFeedback} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('generatingFeedback')}
            </>
          ) : (
            t('getFeedback')
          )}
        </Button>
      )}
    </Card>
  );
};

export default AIFeedback;