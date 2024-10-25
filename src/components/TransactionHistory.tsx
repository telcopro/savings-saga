import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Wallet } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";
import { useState } from "react";
import TransferMoney from "./TransferMoney";
import WithdrawMoney from "./WithdrawMoney";

interface TransactionHistoryProps {
  accountId: number;
  accountType: string;
  accountNumber: string;
  onBack: () => void;
}

const TransactionHistory = ({ accountId, accountType, accountNumber, onBack }: TransactionHistoryProps) => {
  const { getAccountTransactions } = useBanking();
  const transactions = getAccountTransactions(accountId);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  if (showTransfer) {
    return <TransferMoney preSelectedAccount={accountId.toString()} onBack={() => setShowTransfer(false)} />;
  }

  if (showWithdraw) {
    return <WithdrawMoney accounts={[]} preSelectedAccount={accountId.toString()} onBack={() => setShowWithdraw(false)} />;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold">{accountType} Account</h2>
          <p className="text-sm text-gray-500">Account: {accountNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTransfer(true)}>
            <Send className="h-4 w-4 mr-2" />
            Transfer
          </Button>
          <Button variant="outline" onClick={() => setShowWithdraw(true)}>
            <Wallet className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
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