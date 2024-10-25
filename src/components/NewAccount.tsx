import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBanking } from "@/contexts/BankingContext";
import { useLanguage } from "@/contexts/LanguageContext";

const NewAccount = () => {
  const { toast } = useToast();
  const { addAccount } = useBanking();
  const { t } = useLanguage();
  const [accountType, setAccountType] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");

  const handleCreateAccount = () => {
    if (!accountType || !initialDeposit || Number(initialDeposit) <= 0) {
      toast({
        title: t('invalidInput'),
        description: t('invalidInputMessage'),
        variant: "destructive",
      });
      return;
    }

    addAccount(accountType, Number(initialDeposit));
    
    toast({
      title: t('accountCreated'),
      description: t('accountCreatedMessage'),
    });

    setAccountType("");
    setInitialDeposit("");
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{t('newAccount')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('accountType')}</label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectAccountType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Savings">{t('savingsAccount')}</SelectItem>
              <SelectItem value="Checking">{t('checkingAccount')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('initialDeposit')}</label>
          <Input
            type="number"
            placeholder={t('enterInitialDeposit')}
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleCreateAccount}
          disabled={!accountType || !initialDeposit || Number(initialDeposit) <= 0}
        >
          {t('createAccount')}
        </Button>
      </div>
    </Card>
  );
};

export default NewAccount;