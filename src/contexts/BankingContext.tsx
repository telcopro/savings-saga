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
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
}

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  transferMoney: (fromAccountId: number, toAccountId: number, amount: number, description?: string) => void;
  withdrawMoney: (accountId: number, amount: number, description?: string) => void;
  getAccountTransactions: (accountId: number) => Transaction[];
  addAccount: (type: string, initialDeposit: number, name: string) => void;
}

const BankingContext = createContext<BankingContextType | undefined>(undefined);

export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "Main Savings", type: "Savings", balance: 15420.50, accountNumber: "****1234" },
    { id: 2, name: "Daily Expenses", type: "Checking", balance: 3250.75, accountNumber: "****5678" }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    // February 2024
    {
      id: 20240225,
      date: "2024-02-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20240220,
      date: "2024-02-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20240215,
      date: "2024-02-15",
      description: "Grocery Store - Whole Foods",
      amount: 185.50,
      type: "debit",
      accountId: 2
    },
    // January 2024
    {
      id: 20240125,
      date: "2024-01-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20240120,
      date: "2024-01-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20240112,
      date: "2024-01-12",
      description: "Grocery Store - Trader Joe's",
      amount: 142.75,
      type: "debit",
      accountId: 2
    },
    // December 2023
    {
      id: 20231225,
      date: "2023-12-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20231220,
      date: "2023-12-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20231215,
      date: "2023-12-15",
      description: "Holiday Grocery Shopping",
      amount: 245.30,
      type: "debit",
      accountId: 2
    },
    // November 2023
    {
      id: 20231125,
      date: "2023-11-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20231120,
      date: "2023-11-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20231110,
      date: "2023-11-10",
      description: "Grocery Store - Safeway",
      amount: 168.25,
      type: "debit",
      accountId: 2
    },
    // October 2023
    {
      id: 20231025,
      date: "2023-10-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20231020,
      date: "2023-10-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20231015,
      date: "2023-10-15",
      description: "Grocery Store - Whole Foods",
      amount: 195.60,
      type: "debit",
      accountId: 2
    },
    // September 2023
    {
      id: 20230925,
      date: "2023-09-25",
      description: "Monthly Salary",
      amount: 4500.00,
      type: "credit",
      accountId: 1
    },
    {
      id: 20230920,
      date: "2023-09-20",
      description: "Mortgage Payment",
      amount: 1800.00,
      type: "debit",
      accountId: 2
    },
    {
      id: 20230910,
      date: "2023-09-10",
      description: "Grocery Store - Trader Joe's",
      amount: 156.80,
      type: "debit",
      accountId: 2
    }
  ]);

  const withdrawMoney = (accountId: number, amount: number, description: string = "ATM Withdrawal") => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) {
      throw new Error("Account not found");
    }

    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }

    setAccounts(accounts.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, balance: acc.balance - amount };
      }
      return acc;
    }));

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description,
      amount: amount,
      type: "debit",
      accountId: accountId
    };

    setTransactions([...transactions, newTransaction]);
  };

  const addAccount = (type: string, initialDeposit: number, name: string) => {
    const newId = Math.max(...accounts.map(acc => acc.id), 0) + 1;
    const accountNumber = Math.random().toString().slice(2, 6);
    
    const newAccount: Account = {
      id: newId,
      name,
      type,
      balance: initialDeposit,
      accountNumber: `****${accountNumber}`
    };

    setAccounts([...accounts, newAccount]);

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

  const transferMoney = (fromAccountId: number, toAccountId: number, amount: number, description: string = "Transfer") => {
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

    setAccounts(accounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toAccountId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    }));

    const newTransactions: Transaction[] = [
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: `${description} to account ${toAccount.accountNumber}`,
        amount: amount,
        type: "debit",
        accountId: fromAccountId
      },
      {
        id: Date.now() + 1,
        date: new Date().toISOString().split('T')[0],
        description: `${description} from account ${fromAccount.accountNumber}`,
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
      withdrawMoney,
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