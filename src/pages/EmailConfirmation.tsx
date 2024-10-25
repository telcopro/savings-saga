import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const next = searchParams.get('next') || '/';

      if (token_hash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (error) throw error;

          toast({
            title: "Email confirmed",
            description: "Your email has been confirmed successfully. You can now log in.",
          });
          
          // Redirect to login after successful confirmation
          navigate('/login');
        } catch (error: any) {
          toast({
            title: "Confirmation failed",
            description: error.message,
            variant: "destructive",
          });
          navigate('/signup');
        }
      } else {
        navigate('/');
      }
      setIsConfirming(false);
    };

    confirmEmail();
  }, [navigate, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
          {isConfirming ? (
            <p className="text-gray-600">Confirming your email address...</p>
          ) : (
            <p className="text-gray-600">Redirecting...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmailConfirmation;