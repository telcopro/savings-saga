import { Account } from "../types/banking";

export const initialAccounts: Account[] = [
  { id: 1, name: "Main Savings", type: "Savings", balance: 13420.50, accountNumber: "****1234" },
  { id: 2, name: "Daily Expenses", type: "Checking", balance: 5250.75, accountNumber: "****5678" }
];