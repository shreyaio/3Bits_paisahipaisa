
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { useListings } from "@/contexts/ListingContext";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Calendar as CalendarIcon, Clock, MessageCircle, Share, Heart, AlertTriangle } from "lucide-react";

const ItemDetails = () => {
  const params = useParams();
  const { listings } = useListings();
  const { user } = useAuth();
  const { bookings, addBooking } = useBookings();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find the listing using the id from URL params
  const listing = listings.find(item => item.id === params.id);
  
  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
            <p className="mb-6">The item you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Browse Other Items</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate total price based on selected dates
  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Ensure minimum of 1 day
  };
  
  const totalDays = calculateTotalDays();
  const totalPrice = totalDays * listing.pricePerDay;
  
  // Handle booking
  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book this item.",
        variant: "destructive",
      });
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        title: "Dates required",
        description: "Please select start and end dates for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is trying to book their own item
    if (listing.ownerId === user.id) {
      toast({
        title: "Cannot book your own item",
        description: "You cannot book an item that you've listed.",
        variant: "destructive",
      });
      return;
    }
    
    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      listingId: listing.id,
      itemName: listing.title,
      itemImage: listing.images[0],
      ownerId: listing.ownerId,
      ownerName: user?.id === listing.ownerId ? user.name : "Unknown Owner",
      renterId: user.id,
      renterName: user.name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice,
      status: "pending" as "pending",
      createdAt: new Date().toISOString(),
    };
    
    addBooking(newBooking);
    
    toast({
      title: "Booking request sent",
      description: "The owner will be notified of your request.",
    });
  };
  
  // Toggle wishlist status
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? "This item has been removed from your wishlist." 
        : "This item has been added to your wishlist.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Item image and details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-amber-500">
                  <StarRating rating={listing.rating} />
                  <span className="ml-2 text-sm text-gray-500">
                    ({listing.reviews.length} reviews)
                  </span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location.toString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t border-b mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Price Per Day</div>
                  <div className="text-2xl font-bold">${listing.pricePerDay}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Condition</div>
                  <div className="font-medium">{listing.condition}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-medium">{listing.category}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Rental Period</div>
                  <div className="font-medium">
                    {listing.minRentalDays} - {listing.maxRentalDays} days
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  className={`${isWishlisted ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    const shareData = {
                      title: listing.title,
                      text: `Check out this item: ${listing.title}`,
                      url: window.location.href,
                    };

                    if (navigator.share) {
                      navigator.share(shareData).catch((error) => {
                        console.error("Error sharing:", error);
                      });
                    } else {
                      // Fallback for platforms that don't support navigator.share
                      toast({
                        title: "Sharing not supported",
                        description: "Your browser does not support the Web Share API.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button variant="outline" className="text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Lender Information</h2>
                {listing.ownerId !== user?.id && (
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-xl text-gray-500">{listing.ownerId.charAt(0)}</span>
                </div>
                
                <div>
                  <div className="font-medium flex items-center">
                    {listing.ownerId === user?.id ? user.name : "Unknown Owner"}
                    <VerificationBadge verified={true} status="verified" className="ml-2" />
                  </div>
                  <div className="text-sm text-gray-500">Member since {new Date().getFullYear()}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6">Reviews & Ratings</h2>
              
              {listing.reviews.length > 0 ? (
                <div>
                  {/* Reviews would go here */}
                  <p>Reviews to be implemented</p>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-gray-500">No reviews yet for this item.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Booking widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Book This Item</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Dates</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm">${listing.pricePerDay} × {totalDays} days</div>
                  <div>${totalPrice}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">Service fee</div>
                  <div>$0</div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full mb-4"
                onClick={handleBooking}
                disabled={listing.ownerId === user?.id}
              >
                {listing.ownerId === user?.id ? "This is your listing" : "Request to Book"}
              </Button>
              
              <div className="text-xs text-center text-gray-500">
                You won't be charged yet
              </div>
              
              {/* Policy reminders */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium mb-1">Timely Returns</div>
                    <p className="text-gray-500">Return by the due date to avoid late fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium mb-1">Cancellation Policy</div>
                    <p className="text-gray-500">Free cancellation up to 24 hours before pickup.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetails;
