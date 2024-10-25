import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const NewAccount = () => {
  const { toast } = useToast();
  const [accountType, setAccountType] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");

  const handleCreateAccount = () => {
    toast({
      title: "Account Created",
      description: "Your new account has been created successfully.",
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Open New Account</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <Select onValueChange={setAccountType}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Savings Account</SelectItem>
              <SelectItem value="checking">Checking Account</SelectItem>
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
          />
        </div>

        <Button className="w-full" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </div>
    </Card>
  );
};

export default NewAccount;