import { Account, Transaction } from "../types/banking";

export const validateTransfer = (
  accounts: Account[],
  fromAccountId: number,
  toAccountId: number,
  amount: number
) => {
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
};

export const validateWithdrawal = (
  accounts: Account[],
  accountId: number,
  amount: number
) => {
  const account = accounts.find(acc => acc.id === accountId);
  
  if (!account) {
    throw new Error("Account not found");
  }

  if (account.balance < amount) {
    throw new Error("Insufficient funds");
  }
};

export const createTransferTransactions = (
  fromAccountId: number,
  toAccountId: number,
  amount: number,
  description: string
): Transaction[] => {
  const date = new Date().toISOString().split('T')[0];
  const baseId = Date.now();

  return [
    {
      id: baseId,
      date,
      description: `${description} to account ****${fromAccountId}`,
      amount,
      type: "debit",
      accountId: fromAccountId
    },
    {
      id: baseId + 1,
      date,
      description: `${description} from account ****${toAccountId}`,
      amount,
      type: "credit",
      accountId: toAccountId
    }
  ];
};

export const createWithdrawalTransaction = (
  accountId: number,
  amount: number,
  description: string
): Transaction => ({
  id: Date.now(),
  date: new Date().toISOString().split('T')[0],
  description,
  amount,
  type: "debit",
  accountId
});