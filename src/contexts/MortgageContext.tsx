import React, { createContext, useContext } from "react";

interface MortgageDetails {
  id: string;
  propertyAddress: string;
  propertyImage: string;
  totalAmount: number;
  remainingBalance: number;
  monthlyPayment: number;
  nextPaymentDue: string;
  isUpToDate: boolean;
  paymentHistory: {
    dueDate: string;
    amount: number;
    status: 'paid' | 'pending' | 'late';
  }[];
}

interface MortgageContextType {
  mortgages: MortgageDetails[];
}

const MortgageContext = createContext<MortgageContextType>({
  mortgages: [
    {
      id: "1",
      propertyAddress: "123 Main Street, Anytown, USA",
      propertyImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      totalAmount: 350000,
      remainingBalance: 280000,
      monthlyPayment: 1800,
      nextPaymentDue: "2024-03-15",
      isUpToDate: true,
      paymentHistory: [
        { dueDate: "2024-02-15", amount: 1800, status: 'paid' },
        { dueDate: "2024-01-15", amount: 1800, status: 'paid' },
      ]
    }
  ]
});

export const MortgageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MortgageContext.Provider value={{ mortgages: MortgageContext._currentValue.mortgages }}>
      {children}
    </MortgageProvider>
  );
};

export const useMortgage = () => {
  const context = useContext(MortgageContext);
  if (context === undefined) {
    throw new Error("useMortgage must be used within a MortgageProvider");
  }
  return context;
};