export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  accountId: number;
}

export interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
}