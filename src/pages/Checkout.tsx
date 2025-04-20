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

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-lime-600">
          <ShoppingCart className="w-7 h-7 transition-transform hover:scale-110" />
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <BentoBox className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  required
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <Label className="mb-2 block">Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value as typeof PaymentMethods[number]["id"] })
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  {PaymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="text-lime-600 focus:ring-lime-400"
                      />
                      <Label htmlFor={method.id}>{method.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="note">Additional Notes (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Any special instructions..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </BentoBox>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <BentoBox className="p-6 space-y-4 sticky top-4 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex justify-between items-center py-2 border-b border-dashed border-lime-200 text-sm"
                  >
                    <span>{booking.listingId}</span>
                    <span className="font-medium">${booking.totalPrice}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-lime-300 font-semibold">
                <div className="flex justify-between items-center">
                  <span>Total Amount</span>
                  <span className="text-lime-600">${totalAmount}</span>
                </div>
              </div>

              <Button
                className="w-full mt-4 bg-lime-600 hover:bg-lime-700 transition-colors"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </BentoBox>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
