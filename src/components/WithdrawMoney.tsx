import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBanking } from "@/contexts/BankingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

interface Account {
  id: number;
  type: string;
  balance: number;
  accountNumber: string;
}

interface WithdrawMoneyProps {
  accounts: Account[];
  preSelectedAccount?: string;
  onBack?: () => void;
}

const WithdrawMoney = ({ accounts, preSelectedAccount, onBack }: WithdrawMoneyProps) => {
  const { toast } = useToast();
  const { accounts: contextAccounts } = useBanking();
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState(preSelectedAccount || "");

  const availableAccounts = accounts.length > 0 ? accounts : contextAccounts;

  const handleWithdraw = () => {
    const account = availableAccounts.find(acc => acc.id.toString() === fromAccount);
    
    if (!account) {
      toast({
        title: "Error",
        description: "Please select an account",
        variant: "destructive",
      });
      return;
    }

    const withdrawAmount = Number(amount);
    if (withdrawAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (account.balance < withdrawAmount) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Successful",
      description: `$${amount} has been withdrawn successfully.`,
    });

    if (onBack) onBack();
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-4">
        {onBack && (
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-xl font-semibold">{t('withdrawMoney')}</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('fromAccount')}</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectAccount')} />
            </SelectTrigger>
            <SelectContent>
              {availableAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {t(account.type === "Savings" ? 'savingsAccount' : 'checkingAccount')} - {account.accountNumber} (${account.balance.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('amount')}</label>
          <Input
            type="number"
            placeholder={t('enterAmount')}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleWithdraw}
          disabled={!fromAccount || !amount || Number(amount) <= 0}
        >
          {t('withdrawMoney')}
        </Button>
      </div>
    </Card>
  );
};

export default WithdrawMoney;