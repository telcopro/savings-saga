import { Card } from "@/components/ui/card";

interface Account {
  id: number;
  type: string;
  balance: number;
  accountNumber: string;
}

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList = ({ accounts }: AccountsListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {accounts.map((account) => (
        <Card key={account.id} className="p-6">
          <h3 className="text-lg font-semibold">{account.type} Account</h3>
          <p className="text-sm text-gray-500">Account: {account.accountNumber}</p>
          <p className="text-2xl font-bold mt-2">
            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default AccountsList;