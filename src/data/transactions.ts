import { Transaction } from "../types/banking";

// February 2024
const february2024: Transaction[] = [
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
  }
];

// January 2024
const january2024: Transaction[] = [
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
  }
];

// December 2023
const december2023: Transaction[] = [
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
  }
];

export const initialTransactions: Transaction[] = [
  ...february2024,
  ...january2024,
  ...december2023
];