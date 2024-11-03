import React, { createContext, useContext, useState } from "react";
import { Account, Transaction } from "../types/banking";
import { initialAccounts } from "../data/accounts";
import { initialTransactions } from "../data/transactions";
import {
  validateTransfer,
  validateWithdrawal,
  createTransferTransactions,
  createWithdrawalTransaction
} from "../utils/bankingOperations";

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
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const transferMoney = (fromAccountId: number, toAccountId: number, amount: number, description: string = "Transfer") => {
    validateTransfer(accounts, fromAccountId, toAccountId, amount);

    const newTransactions = createTransferTransactions(fromAccountId, toAccountId, amount, description);

    setAccounts(accounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toAccountId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    }));

    setTransactions([...transactions, ...newTransactions]);
  };

  const withdrawMoney = (accountId: number, amount: number, description: string = "ATM Withdrawal") => {
    validateWithdrawal(accounts, accountId, amount);

    const newTransaction = createWithdrawalTransaction(accountId, amount, description);

    setAccounts(accounts.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, balance: acc.balance - amount };
      }
      return acc;
    }));

    setTransactions([...transactions, newTransaction]);
  };

  const getAccountTransactions = (accountId: number) => {
    return transactions.filter(transaction => transaction.accountId === accountId);
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