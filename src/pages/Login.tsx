import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleBankIDLogin = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would:
      // 1. Call your backend to initiate BankID authentication
      // 2. Start polling for authentication status
      // 3. Receive the SSN upon successful authentication
      
      // Simulating BankID authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Login Successful",
        description: "Welcome to SecureBank",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Unable to authenticate with BankID. Please try again.",
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
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold">Welcome to SecureBank</h1>
          <p className="text-gray-600 mt-2">Login securely with BankID</p>
        </div>

        <Button
          className="w-full h-12 text-lg"
          onClick={handleBankIDLogin}
          disabled={isLoading}
        >
          {isLoading ? "Launching BankID..." : "Login with BankID"}
        </Button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Make sure you have BankID installed on your device
        </p>
      </Card>
    </div>
  );
};

export default Login;