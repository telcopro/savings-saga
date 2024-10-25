import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBanking } from "@/contexts/BankingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

interface TransferMoneyProps {
  preSelectedAccount?: string;
  onBack?: () => void;
}

const TransferMoney = ({ preSelectedAccount, onBack }: TransferMoneyProps) => {
  const { toast } = useToast();
  const { accounts, transferMoney } = useBanking();
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState(preSelectedAccount || "");
  const [toAccount, setToAccount] = useState("");

  const handleTransfer = () => {
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: t('invalidTransfer'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    if (fromAccount === toAccount) {
      toast({
        title: t('invalidTransfer'),
        description: t('sameAccountError'),
        variant: "destructive",
      });
      return;
    }

    try {
      transferMoney(Number(fromAccount), Number(toAccount), Number(amount));
      toast({
        title: t('transferSuccessful'),
        description: t('transferSuccessMessage').replace('${amount}', `$${amount}`),
      });
      setAmount("");
      setFromAccount(preSelectedAccount || "");
      setToAccount("");
      if (onBack) onBack();
    } catch (error) {
      toast({
        title: t('transferFailed'),
        description: error instanceof Error ? error.message : t('insufficientFunds'),
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-4">
        {onBack && (
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-xl font-semibold">{t('transferMoney')}</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('fromAccount')}</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectAccount')} />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber} (${account.balance.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('toAccount')}</label>
          <Select value={toAccount} onValueChange={setToAccount}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectAccount')} />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber} (${account.balance.toFixed(2)})
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
          onClick={handleTransfer}
          disabled={!fromAccount || !toAccount || !amount || Number(amount) <= 0}
        >
          {t('transferMoney')}
        </Button>
      </div>
    </Card>
  );
};

export default TransferMoney;