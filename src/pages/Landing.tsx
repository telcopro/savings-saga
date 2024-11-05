import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Admin from "./Admin";

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">{t('welcome')}</h1>
          <p className="text-gray-600 mt-2">Choose how you want to proceed</p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full h-12 text-lg"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-lg"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-12 text-lg flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Admin Settings
              </Button>
            </DrawerTrigger>
            <Admin />
          </Drawer>
        </div>
      </Card>
    </div>
  );
};

export default Landing;