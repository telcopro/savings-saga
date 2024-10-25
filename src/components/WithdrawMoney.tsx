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

interface WithdrawMoneyProps {
  accounts: Account[];
}

const WithdrawMoney = ({ accounts }: WithdrawMoneyProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Successful",
      description: `$${amount} has been withdrawn successfully.`,
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Withdraw Money</h2>
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
          <label className="block text-sm font-medium mb-1">Amount</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleWithdraw}>
          Withdraw Money
        </Button>
      </div>
    </Card>
  );
};

export default WithdrawMoney;