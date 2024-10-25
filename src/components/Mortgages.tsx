import { Card } from "@/components/ui/card";
import { useMortgage } from "@/contexts/MortgageContext";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Home } from "lucide-react";
import { format, parseISO } from "date-fns";

const Mortgages = () => {
  const { mortgages } = useMortgage();

  if (mortgages.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Home className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium">No Active Mortgages</h3>
          <p>You don't have any active mortgages at the moment.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {mortgages.map((mortgage) => (
        <Card key={mortgage.id} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
              <img
                src={mortgage.propertyImage}
                alt="Property"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{mortgage.propertyAddress}</h3>
                <Badge variant={mortgage.isUpToDate ? "secondary" : "destructive"}>
                  {mortgage.isUpToDate ? "Up to date" : "Payment required"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold">
                    ${mortgage.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining Balance</p>
                  <p className="font-semibold">
                    ${mortgage.remainingBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Payment</p>
                  <p className="font-semibold">
                    ${mortgage.monthlyPayment.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Payment Due</p>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <p className="font-semibold">
                      {format(parseISO(mortgage.nextPaymentDue), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent Payments</h4>
                <div className="space-y-2">
                  {mortgage.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{format(parseISO(payment.dueDate), 'MMM d, yyyy')}</span>
                      <span>${payment.amount.toLocaleString()}</span>
                      <Badge variant={
                        payment.status === 'paid' ? "secondary" : 
                        payment.status === 'pending' ? "outline" : "destructive"
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Mortgages;