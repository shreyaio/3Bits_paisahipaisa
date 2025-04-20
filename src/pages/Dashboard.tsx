import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import ProfileCompletion from "@/components/shared/ProfileCompletion";
import { useAuth } from "@/contexts/AuthContext";
import { useListings } from "@/contexts/ListingContext";
import { useBookings } from "@/contexts/BookingContext";
import {
  Shield,
  Plus,
  Package,
  CalendarClock,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const { user } = useAuth();
  const { listings } = useListings();
  const { bookings } = useBookings();
  const [activeTab, setActiveTab] = useState("overview");
  const [isVerifying, setIsVerifying] = useState(false);

  // Filter user's listings and bookings
  const userListings = listings.filter(
    (listing) => listing.ownerId === user?.id
  );
  const userBookings = bookings.filter(
    (booking) => booking.renterId === user?.id
  );

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with user info and verification status */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-500">
                      {user?.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <ProfileCompletion
                  percentage={user?.completionPercentage || 0}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Verification Status</span>
                  <span
                    className={`text-sm ${
                      user?.verificationStatus === "verified"
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {user?.verificationStatus === "verified"
                      ? "Verified"
                      : "Basic"}
                  </span>
                </div>

                {user?.verificationStatus !== "verified" && (
                  <Dialog open={isVerifying} onOpenChange={setIsVerifying}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setIsVerifying(true)}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Get Verified
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Verify Your Identity</DialogTitle>
                      </DialogHeader>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // Simulate form submission
                          console.log("Submitted for verification");
                          setIsVerifying(false);
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="idNumber">
                            Government ID Number
                          </Label>
                          <Input
                            id="idNumber"
                            placeholder="e.g. Aadhaar / SSN / Driver's License"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="idImage">
                            Upload Government ID Image
                          </Label>
                          <Input
                            id="idImage"
                            type="file"
                            accept="image/*"
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          Submit for Verification
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:w-2/3 lg:w-3/4">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500 mb-1">
                      Total Listings
                    </h3>
                    <p className="text-3xl font-bold">
                      {userListings.length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500 mb-1">
                      Active Rentals
                    </h3>
                    <p className="text-3xl font-bold">
                      {
                        userBookings.filter(
                          (b) => b.status === "ongoing"
                        ).length
                      }
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-medium text-gray-500 mb-1">
                      Total Earnings
                    </h3>
                    <p className="text-3xl font-bold">$0</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activity</p>
                  </div>
                </div>
              </TabsContent>

                <TabsContent value="listings">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">My Listings</h3>
                  <Button size="sm" onClick={() => window.location.href = "/list-item"}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Listing
                  </Button>
                  </div>

                  {userListings.length > 0 ? (
                  <div className="space-y-4">
                    {userListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                      <h4 className="font-medium">{listing.title}</h4>
                      <p className="text-sm text-gray-500">
                        {listing.description}
                      </p>
                      </div>
                      <span className="text-sm text-gray-500">
                      ${listing.pricePerDay}
                      </span>
                    </div>
                    ))}
                  </div>
                  ) : (
                  <div className="text-center py-12 border border-dashed rounded-lg">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                    No Listings Yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                    Start sharing your items with others.
                    </p>
                    <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Listing
                    </Button>
                  </div>
                  )}
                </div>
                </TabsContent>

              <TabsContent value="bookings">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-6">My Bookings</h3>

                  {userBookings.length > 0 ? (
                    <div className="space-y-4">
                      <p>User bookings will appear here</p>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                      <CalendarClock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Bookings Yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start by browsing items to rent.
                      </p>
                      <Button>Browse Items</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
