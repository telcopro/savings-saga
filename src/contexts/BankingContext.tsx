import React, { createContext, useContext, useState } from "react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  accountId: number;
}

interface Account {
  id: number;
  type: string;
  balance: number;
  accountNumber: string;
}

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  transferMoney: (fromAccountId: number, toAccountId: number, amount: number) => void;
  getAccountTransactions: (accountId: number) => Transaction[];
  addAccount: (type: string, initialDeposit: number) => void;
}

const BankingContext = createContext<BankingContextType | undefined>(undefined);

export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, type: "Savings", balance: 5000.00, accountNumber: "****1234" },
    { id: 2, type: "Checking", balance: 2500.50, accountNumber: "****5678" }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-02-20",
      description: "Grocery Store",
      amount: 85.50,
      type: "debit",
      accountId: 2
    },
    {
      id: 2,
      date: "2024-02-19",
      description: "Salary Deposit",
      amount: 2500.00,
      type: "credit",
      accountId: 1
    }
  ]);

  const addAccount = (type: string, initialDeposit: number) => {
    const newId = Math.max(...accounts.map(acc => acc.id), 0) + 1;
    const accountNumber = Math.random().toString().slice(2, 6);
    
    const newAccount: Account = {
      id: newId,
      type,
      balance: initialDeposit,
      accountNumber: `****${accountNumber}`
    };

    setAccounts([...accounts, newAccount]);

    // Create initial deposit transaction
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: "Initial Deposit",
      amount: initialDeposit,
      type: "credit",
      accountId: newId
    };

    setTransactions([...transactions, newTransaction]);
  };

  const transferMoney = (fromAccountId: number, toAccountId: number, amount: number) => {
    const fromAccount = accounts.find(acc => acc.id === fromAccountId);
    const toAccount = accounts.find(acc => acc.id === toAccountId);

    if (!fromAccount || !toAccount) {
      throw new Error("Invalid account selection");
    }

    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Update account balances
    setAccounts(accounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toAccountId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    }));

    // Create new transactions
    const newTransactions: Transaction[] = [
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: `Transfer to account ${toAccount.accountNumber}`,
        amount: amount,
        type: "debit",
        accountId: fromAccountId
      },
      {
        id: Date.now() + 1,
        date: new Date().toISOString().split('T')[0],
        description: `Transfer from account ${fromAccount.accountNumber}`,
        amount: amount,
        type: "credit",
        accountId: toAccountId
      }
    ];

    setTransactions([...transactions, ...newTransactions]);
  };

  const getAccountTransactions = (accountId: number) => {
    return transactions.filter(transaction => transaction.accountId === accountId);
  };

  return (
    <BankingContext.Provider value={{ 
      accounts, 
      transactions, 
      transferMoney,
      getAccountTransactions,
      addAccount
    }}>
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = () => {
  const context = useContext(BankingContext);
  if (context === undefined) {
    throw new Error("useBanking must be used within a BankingProvider");
  }
  return context;
};