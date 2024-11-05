import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Key } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Admin = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().startsWith('sk-')) {
      sessionStorage.setItem('openai-key', apiKey.trim());
      toast({
        title: "Success",
        description: "API key has been stored in session storage",
      });
      setApiKey("");
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive",
      });
    }
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Admin Settings</DrawerTitle>
        <DrawerDescription>Configure your application settings here.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        <Card className="w-full p-6">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">OpenAI Configuration</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                OpenAI API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="font-mono"
              />
            </div>
            <Button type="submit" className="w-full">
              Save API Key
            </Button>
          </form>
        </Card>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default Admin;