import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

interface TransactionHistoryProps {
  accountId: number;
  accountType: string;
  accountNumber: string;
  onBack: () => void;
}

const TransactionHistory = ({ accountId, accountType, accountNumber, onBack }: TransactionHistoryProps) => {
  // In a real app, this would be fetched from an API based on the accountId
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-02-20",
      description: "Grocery Store",
      amount: 85.50,
      type: "debit"
    },
    {
      id: 2,
      date: "2024-02-19",
      description: "Salary Deposit",
      amount: 2500.00,
      type: "credit"
    },
    {
      id: 3,
      date: "2024-02-18",
      description: "Online Shopping",
      amount: 124.99,
      type: "debit"
    }
  ]);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">{accountType} Account</h2>
          <p className="text-sm text-gray-500">Account: {accountNumber}</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={`text-right ${
                transaction.type === "credit" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "credit" ? "+" : "-"}
                ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TransactionHistory;