import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Smartphone } from "lucide-react";
import { useAuth } from "../App";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleBankIDLogin = async () => {
    setIsLoading(true);
    try {
      // Simulating BankID authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('loginSuccessful'),
        description: t('welcomeMessage'),
      });
      login();
    } catch (error) {
      toast({
        title: t('loginFailed'),
        description: t('loginFailedMessage'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">{t('welcomeMessage')}</h1>
          <p className="text-gray-600 mt-2">{t('loginWithBankID')}</p>
        </div>

        <Button
          className="w-full h-12 text-lg"
          onClick={handleBankIDLogin}
          disabled={isLoading}
        >
          {isLoading ? t('launchingBankID') : t('loginWithBankID')}
        </Button>

        <div className="mt-6 space-y-4">
          <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">{t('howToLogin')}:</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>{t('mobileLoginInstructions')}</li>
              <li>{t('computerLoginInstructions')}</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 text-center">
            {t('bankIDInstallNote')}
          </p>
          <p className="text-sm text-center">
            <Link to="/admin" className="text-blue-600 hover:underline">
              Go to Admin Settings
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;