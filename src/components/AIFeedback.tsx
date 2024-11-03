import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";
import { useMortgage } from "@/contexts/MortgageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAIFeedback } from "@/api/ai-feedback";

const AIFeedback = () => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { accounts, transactions } = useBanking();
  const { mortgages } = useMortgage();
  const { t, language } = useLanguage();

  const generatePrompt = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const mortgageBalance = mortgages.reduce((sum, m) => sum + m.remainingBalance, 0);
    
    return `Please analyze this customer's financial situation:

Total Balance Across Accounts: $${totalBalance}
Number of Accounts: ${accounts.length}
Mortgage Balance: $${mortgageBalance}
Number of Mortgages: ${mortgages.length}

Account Details:
${accounts.map(acc => `- ${acc.type} Account: $${acc.balance}`).join('\n')}

Recent Transactions:
${transactions.slice(0, 5).map(t => 
  `- ${t.type === 'credit' ? 'Received' : 'Spent'} $${t.amount} - ${t.description}`
).join('\n')}`;
  };

  const getFeedback = async () => {
    setLoading(true);
    try {
      const data = await getAIFeedback(generatePrompt(), language);
      setFeedback(data.feedback);
    } catch (error) {
      console.error('Failed to get AI feedback:', error);
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