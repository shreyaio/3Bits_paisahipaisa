import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Layout from "@/components/layout/Layout";
import BentoBox from "@/components/shared/BentoBox";
import { useState } from "react";
import { Loader, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethods = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" }
] as const;

const Checkout = () => {
  const { user } = useAuth();
  const { bookings } = useBookings();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    phone: string;
    address: string;
    paymentMethod: typeof PaymentMethods[number]["id"];
    note: string;
  }>({
    phone: "",
    address: "",
    paymentMethod: PaymentMethods[0].id,
    note: ""
  });

  const totalAmount = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to place order",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="w-7 h-7 text-lime-600 transition-transform hover:scale-110" />
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <BentoBox className="p-6">
              <div className="space-y-4">
                {/* Pre-filled User Info */}
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={user?.name} disabled />
                </div>
                
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={user?.email} disabled />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Textarea
                    id="address"
                    required
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as typeof PaymentMethods[number]["id"] })}
                    className="space-y-2"
                  >
                    {PaymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id}>{method.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Optional Note */}
                <div className="space-y-2">
                  <Label htmlFor="note">Additional Notes (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="Any special instructions..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>
              </div>
            </BentoBox>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <BentoBox className="p-6 space-y-4 sticky top-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              
              <div className="space-y-2">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center py-2 border-b border-lime/20">
                    <span>{booking.listingId}</span>
                    <span>${booking.totalPrice}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-lime/20">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span>${totalAmount}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </BentoBox>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
