import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBanking } from "@/contexts/BankingContext";

const TransferMoney = () => {
  const { toast } = useToast();
  const { accounts, transferMoney } = useBanking();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const handleTransfer = () => {
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Invalid Transfer",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (fromAccount === toAccount) {
      toast({
        title: "Invalid Transfer",
        description: "Cannot transfer to the same account",
        variant: "destructive",
      });
      return;
    }

    try {
      transferMoney(Number(fromAccount), Number(toAccount), Number(amount));
      toast({
        title: "Transfer Successful",
        description: `$${amount} has been transferred successfully.`,
      });
      setAmount("");
      setFromAccount("");
      setToAccount("");
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">From Account</label>
          <Select value={fromAccount} onValueChange={setFromAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber} (${account.balance.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To Account</label>
          <Select value={toAccount} onValueChange={setToAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.type} - {account.accountNumber} (${account.balance.toFixed(2)})
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

        <Button 
          className="w-full" 
          onClick={handleTransfer}
          disabled={!fromAccount || !toAccount || !amount}
        >
          Transfer Money
        </Button>
      </div>
    </Card>
  );
};

export default TransferMoney;