import { useState } from "react";
import { Card } from "@/components/ui/card";
import TransactionHistory from "./TransactionHistory";
import { useLanguage } from "@/contexts/LanguageContext";

interface Account {
  id: number;
  type: string;
  name: string;
  balance: number;
  accountNumber: string;
}

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList = ({ accounts }: AccountsListProps) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { t } = useLanguage();

  if (selectedAccount) {
    return (
      <TransactionHistory
        accountId={selectedAccount.id}
        accountType={selectedAccount.type === "Savings" ? t('savingsAccount') : t('checkingAccount')}
        accountNumber={selectedAccount.accountNumber}
        onBack={() => setSelectedAccount(null)}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {accounts.map((account) => (
        <Card 
          key={account.id} 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedAccount(account)}
        >
          <h3 className="text-lg font-semibold">
            {account.name}
          </h3>
          <p className="text-sm text-gray-500">
            {account.type === "Savings" ? t('savingsAccount') : t('checkingAccount')} - {account.accountNumber}
          </p>
          <p className="text-2xl font-bold mt-2">
            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default AccountsList;