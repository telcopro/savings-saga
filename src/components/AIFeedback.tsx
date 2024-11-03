import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAIFeedback } from "@/api/ai-feedback";

const AIFeedback = () => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fullPrompt, setFullPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { accounts, transactions } = useBanking();
  const { t, language } = useLanguage();

  const generatePrompt = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const recentTransactions = transactions
      .filter(t => new Date(t.date) >= threeMonthsAgo)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const transactionsText = recentTransactions
      .map(t => {
        const formattedAmount = t.amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
        return `- ${t.date}: ${t.type === 'credit' ? 'Received' : 'Spent'} ${formattedAmount} - ${t.description}`;
      })
      .join('\n');

    const prompt = `Please analyze this customer's financial situation:

Total Balance Across Accounts: ${totalBalance.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})}
Number of Accounts: ${accounts.length}

Account Details:
${accounts.map(acc => 
  `- ${acc.name} (${acc.type}): ${acc.balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })}`
).join('\n')}

Recent Transactions:
${transactionsText}`;

    return prompt;
  };

  const getFeedback = async () => {
    setLoading(true);
    try {
      const generatedPrompt = generatePrompt();
      console.log('Generated Prompt:', generatedPrompt);
      console.log('Transactions:', transactions);
      const data = await getAIFeedback(generatedPrompt, language);
      setFeedback(data.feedback);
      setFullPrompt(data.fullPrompt);
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
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Complete Analysis Data:</h3>
            <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-[400px] bg-muted p-2 rounded font-mono">
              {fullPrompt}
            </pre>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg">
            <h3 className="font-medium mb-2">AI Response:</h3>
            <p className="text-gray-700">{feedback}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setFeedback(null);
              setFullPrompt(null);
            }}
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