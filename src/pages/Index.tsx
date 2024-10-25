import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AccountsList from "@/components/AccountsList";
import TransferMoney from "@/components/TransferMoney";
import NewAccount from "@/components/NewAccount";
import WithdrawMoney from "@/components/WithdrawMoney";
import CustomerProfile from "@/components/CustomerProfile";
import Mortgages from "@/components/Mortgages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, ArrowRight, CreditCard, Wallet, User, Home } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("accounts");
  const [activeAccountTab, setActiveAccountTab] = useState("list");
  const { accounts } = useBanking();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to SecureBank</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="accounts" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="accounts" onClick={() => setActiveTab("accounts")}>
              <Banknote className="mr-2 h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="mortgages" onClick={() => setActiveTab("mortgages")}>
              <Home className="mr-2 h-4 w-4" />
              Mortgages
            </TabsTrigger>
            <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <Tabs value={activeAccountTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="list" onClick={() => setActiveAccountTab("list")}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="transfer" onClick={() => setActiveAccountTab("transfer")}>
                  Transfer
                </TabsTrigger>
                <TabsTrigger value="new-account" onClick={() => setActiveAccountTab("new-account")}>
                  New Account
                </TabsTrigger>
                <TabsTrigger value="withdraw" onClick={() => setActiveAccountTab("withdraw")}>
                  Withdraw
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <AccountsList accounts={accounts} />
              </TabsContent>

              <TabsContent value="transfer">
                <TransferMoney />
              </TabsContent>

              <TabsContent value="new-account">
                <NewAccount />
              </TabsContent>

              <TabsContent value="withdraw">
                <WithdrawMoney accounts={accounts} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="mortgages">
            <Mortgages />
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