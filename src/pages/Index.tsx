import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AccountsList from "@/components/AccountsList";
import TransferMoney from "@/components/TransferMoney";
import NewAccount from "@/components/NewAccount";
import WithdrawMoney from "@/components/WithdrawMoney";
import CustomerProfile from "@/components/CustomerProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, CreditCard, ArrowRight, Wallet, User } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("accounts");

  // Mock data - in real app, this would come from an API
  const accounts = [
    { id: 1, type: "Savings", balance: 5000.00, accountNumber: "****1234" },
    { id: 2, type: "Checking", balance: 2500.50, accountNumber: "****5678" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to SecureBank</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="accounts" className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
            <TabsTrigger value="accounts" onClick={() => setActiveTab("accounts")}>
              <Banknote className="mr-2 h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="transfer" onClick={() => setActiveTab("transfer")}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Transfer
            </TabsTrigger>
            <TabsTrigger value="new-account" onClick={() => setActiveTab("new-account")}>
              <CreditCard className="mr-2 h-4 w-4" />
              New Account
            </TabsTrigger>
            <TabsTrigger value="withdraw" onClick={() => setActiveTab("withdraw")}>
              <Wallet className="mr-2 h-4 w-4" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <AccountsList accounts={accounts} />
          </TabsContent>

          <TabsContent value="transfer">
            <TransferMoney accounts={accounts} />
          </TabsContent>

          <TabsContent value="new-account">
            <NewAccount />
          </TabsContent>

          <TabsContent value="withdraw">
            <WithdrawMoney accounts={accounts} />
          </TabsContent>

          <TabsContent value="profile">
            <CustomerProfile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;