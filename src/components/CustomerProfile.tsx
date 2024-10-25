import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CustomerInfo {
  ssn: string;
  name: string;
  address: string;
  temporaryAddress: string;
  phone: string;
  email: string;
  externalBankAccount: string;
}

const CustomerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  // In a real app, this would come from an API
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    ssn: "123-45-6789",
    name: "John Doe",
    address: "123 Main St, City, State 12345",
    temporaryAddress: "",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
    externalBankAccount: "****5678",
  });

  const [editableInfo, setEditableInfo] = useState({
    temporaryAddress: customerInfo.temporaryAddress,
    phone: customerInfo.phone,
    email: customerInfo.email,
  });

  const handleSave = () => {
    setCustomerInfo({
      ...customerInfo,
      ...editableInfo,
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your information has been successfully updated.",
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Customer Profile</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">SSN</label>
          <Input value={customerInfo.ssn} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <Input value={customerInfo.name} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <Input value={customerInfo.address} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Temporary Address</label>
          <Input
            value={editableInfo.temporaryAddress}
            disabled={!isEditing}
            onChange={(e) => setEditableInfo({ ...editableInfo, temporaryAddress: e.target.value })}
            placeholder="Enter temporary address if needed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <Input
            value={editableInfo.phone}
            disabled={!isEditing}
            onChange={(e) => setEditableInfo({ ...editableInfo, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <Input
            value={editableInfo.email}
            disabled={!isEditing}
            onChange={(e) => setEditableInfo({ ...editableInfo, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">External Bank Account</label>
          <Input value={customerInfo.externalBankAccount} disabled />
        </div>

        {isEditing && (
          <div className="flex gap-4 mt-6">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditableInfo({
                  temporaryAddress: customerInfo.temporaryAddress,
                  phone: customerInfo.phone,
                  email: customerInfo.email,
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CustomerProfile;