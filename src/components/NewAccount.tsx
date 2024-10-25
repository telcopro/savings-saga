import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBanking } from "@/contexts/BankingContext";

const NewAccount = () => {
  const { toast } = useToast();
  const { addAccount } = useBanking();
  const [accountType, setAccountType] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");

  const handleCreateAccount = () => {
    if (!accountType || !initialDeposit || Number(initialDeposit) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select an account type and enter a valid initial deposit amount.",
        variant: "destructive",
      });
      return;
    }

    addAccount(accountType, Number(initialDeposit));
    
    toast({
      title: "Account Created",
      description: "Your new account has been created successfully.",
    });

    // Reset form
    setAccountType("");
    setInitialDeposit("");
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Open New Account</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Savings">Savings Account</SelectItem>
              <SelectItem value="Checking">Checking Account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Initial Deposit</label>
          <Input
            type="number"
            placeholder="Enter initial deposit"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleCreateAccount}
          disabled={!accountType || !initialDeposit || Number(initialDeposit) <= 0}
        >
          Create Account
        </Button>
      </div>
    </Card>
  );
};

export default NewAccount;