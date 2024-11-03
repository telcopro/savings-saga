import { Transaction } from "../types/banking";

// October 2024
const october2024: Transaction[] = [
  {
    id: 20241025,
    date: "2024-10-25",
    description: "Monthly Salary",
    amount: 4500.00,
    type: "credit",
    accountId: 2
  },
  {
    id: 20241026,
    date: "2024-10-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20241026,
    date: "2024-10-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "credit",
    accountId: 1
  },
  {
    id: 20241020,
    date: "2024-10-20",
    description: "Mortgage Payment",
    amount: 1800.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20241015,
    date: "2024-10-15",
    description: "Grocery Store - Whole Foods",
    amount: 185.50,
    type: "debit",
    accountId: 2
  }
];

// September 2024
const september2024: Transaction[] = [
  {
    id: 20240925,
    date: "2024-09-25",
    description: "Monthly Salary",
    amount: 4500.00,
    type: "credit",
    accountId: 2
  },
  {
    id: 20240926,
    date: "2024-09-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240926,
    date: "2024-09-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "credit",
    accountId: 1
  },
  {
    id: 20240920,
    date: "2024-09-20",
    description: "Mortgage Payment",
    amount: 1800.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240912,
    date: "2024-09-12",
    description: "Grocery Store - Trader Joe's",
    amount: 142.75,
    type: "debit",
    accountId: 2
  }
];

// August 2024
const august2024: Transaction[] = [
  {
    id: 20240825,
    date: "2024-08-25",
    description: "Monthly Salary",
    amount: 4500.00,
    type: "credit",
    accountId: 2
  },
  {
    id: 20240826,
    date: "2024-08-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240826,
    date: "2024-08-26",
    description: "Monthly Savings Transfer",
    amount: 500.00,
    type: "credit",
    accountId: 1
  },
  {
    id: 20240820,
    date: "2024-08-20",
    description: "Mortgage Payment",
    amount: 1800.00,
    type: "debit",
    accountId: 2
  },
  {
    id: 20240815,
    date: "2024-08-15",
    description: "Back to School Shopping",
    amount: 345.30,
    type: "debit",
    accountId: 2
  }
];

export const initialTransactions: Transaction[] = [
  ...october2024,
  ...september2024,
  ...august2024
];