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
import LanguageSelector from "@/components/LanguageSelector";
import Messages from "@/components/Messages";
import AIFeedback from "@/components/AIFeedback";
import { MessagesProvider } from "@/contexts/MessagesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, ArrowRight, CreditCard, Wallet, User, Home, MessageSquare, LogOut } from "lucide-react";
import { useBanking } from "@/contexts/BankingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/App";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("accounts");
  const [activeAccountTab, setActiveAccountTab] = useState("list");
  const { accounts } = useBanking();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <AIFeedback />
        </div>

        <MessagesProvider>
          <Tabs defaultValue="accounts" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="accounts" onClick={() => setActiveTab("accounts")}>
                <Banknote className="mr-2 h-4 w-4" />
                {t('accounts')}
              </TabsTrigger>
              <TabsTrigger value="mortgages" onClick={() => setActiveTab("mortgages")}>
                <Home className="mr-2 h-4 w-4" />
                {t('mortgages')}
              </TabsTrigger>
              <TabsTrigger value="messages" onClick={() => setActiveTab("messages")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('messages')}
              </TabsTrigger>
              <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
                <User className="mr-2 h-4 w-4" />
                {t('profile')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts">
              <Tabs value={activeAccountTab} className="space-y-6">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                  <TabsTrigger value="list" onClick={() => setActiveAccountTab("list")}>
                    {t('overview')}
                  </TabsTrigger>
                  <TabsTrigger value="transfer" onClick={() => setActiveAccountTab("transfer")}>
                    {t('transfer')}
                  </TabsTrigger>
                  <TabsTrigger value="new-account" onClick={() => setActiveAccountTab("new-account")}>
                    {t('newAccount')}
                  </TabsTrigger>
                  <TabsTrigger value="withdraw" onClick={() => setActiveAccountTab("withdraw")}>
                    {t('withdraw')}
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

            <TabsContent value="messages">
              <Messages />
            </TabsContent>

            <TabsContent value="profile">
              <CustomerProfile />
            </TabsContent>
          </Tabs>
        </MessagesProvider>
      </main>
    </div>
  );
};

export default Index;