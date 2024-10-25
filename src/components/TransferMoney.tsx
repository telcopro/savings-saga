import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Account {
  id: number;
  type: string;
  balance: number;
  accountNumber: string;
}

interface TransferMoneyProps {
  accounts: Account[];
}

const TransferMoney = ({ accounts }: TransferMoneyProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const handleTransfer = () => {
    toast({
      title: "Transfer Successful",
      description: `$${amount} has been transferred successfully.`,
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">From Account</label>
          <Select onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To Account</label>
          <Select onValueChange={setToAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleTransfer}>
          Transfer Money
        </Button>
      </div>
    </Card>
  );
};

export default TransferMoney;