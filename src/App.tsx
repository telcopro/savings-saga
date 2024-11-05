import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { BankingProvider } from "./contexts/BankingContext";
import { MortgageProvider } from "./contexts/MortgageContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import EmailConfirmation from "./pages/EmailConfirmation";

const queryClient = new QueryClient();

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <BankingProvider>
          <MortgageProvider>
            <MessagesProvider>
              <LanguageProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route 
                        path="/" 
                        element={isAuthenticated ? <Index /> : <Landing />} 
                      />
                      <Route 
                        path="/login" 
                        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
                      />
                      <Route 
                        path="/signup" 
                        element={isAuthenticated ? <Navigate to="/" /> : <Signup />} 
                      />
                      <Route 
                        path="/auth/confirm" 
                        element={<EmailConfirmation />} 
                      />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </LanguageProvider>
            </MessagesProvider>
          </MortgageProvider>
        </BankingProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;