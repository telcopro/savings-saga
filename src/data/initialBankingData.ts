import { Account, Transaction } from "../types/banking";

export const initialAccounts: Account[] = [
  { id: 1, name: "Main Savings", type: "Savings", balance: 13420.50, accountNumber: "****1234" },
  { id: 2, name: "Daily Expenses", type: "Checking", balance: 5250.75, accountNumber: "****5678" }
];

export const initialTransactions: Transaction[] = [
  // February 2024
  {
    id: 20240225,
    date: "2024-02-25",
    description: "Monthly Salary",
    amount: 4500.00,
    type: "credit",
    accountId: 2
  },
  {
    id: 20240226,
    date: "2024-02-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240226,
    date: "2024-02-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
    accountId: 2
  },
  {
    id: 20240126,
    date: "2024-01-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240126,
    date: "2024-01-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
    accountId: 2
  },
  {
    id: 20231226,
    date: "2023-12-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20231226,
    date: "2023-12-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
    accountId: 2
  },
  {
    id: 20231126,
    date: "2023-11-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20231126,
    date: "2023-11-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
    id: 20231115,
    date: "2023-11-15",
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
    accountId: 2
  },
  {
    id: 20231026,
    date: "2023-10-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20231026,
    date: "2023-10-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
    accountId: 2
  },
  {
    id: 20230926,
    date: "2023-09-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20230926,
    date: "2023-09-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
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
];
