
import React, { createContext, useState, useContext, useEffect } from "react";

export interface Booking {
  id: string;
  listingId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "ongoing" | "completed" | "canceled" | "disputed";
  createdAt: string;
  updatedAt?: string;
  disputeReason?: string;
  disputeResolution?: string;
  renterReview?: {
    rating: number;
    comment: string;
    date: string;
  };
  ownerReview?: {
    rating: number;
    comment: string;
    date: string;
  };
}

interface BookingContextType {
  bookings: Booking[];

  // Adds a new booking (expects a full Booking object)
  addBooking: (booking: Booking) => void;

  // Creates a booking (without id, createdAt, status which will be generated internally)
  createBooking: (
    booking: Omit<Booking, "id" | "createdAt" | "status">
  ) => void;

  // Updates the status of a booking (optionally with a reason)
  updateBookingStatus: (
    id: string,
    status: Booking["status"],
    reason?: string
  ) => void;

  // Adds a review for a booking (either by owner or renter)
  addReview: (
    bookingId: string,
    isOwner: boolean,
    rating: number,
    comment: string
  ) => void;

  // Returns bookings related to a user (as renter or owner)
  getUserBookings: (userId: string, asRenter: boolean) => Booking[];

  // Returns all bookings associated with a listing
  getBookingsByListing: (listingId: string) => Booking[];

  // Returns a specific booking by its ID
  getBooking: (id: string) => Booking | undefined;
}


// Sample initial bookings
const initialBookings: Booking[] = [
  {
    id: "booking-1",
    listingId: "listing-1",
    renterId: "user-2",
    ownerId: "user-1",
    startDate: "2023-10-10",
    endDate: "2023-10-12",
    totalPrice: 105,
    status: "completed",
    createdAt: "2023-10-01",
    renterReview: {
      rating: 5,
      comment: "Excellent camera, worked perfectly for my photoshoot!",
      date: "2023-10-15"
    },
    ownerReview: {
      rating: 5,
      comment: "Great renter, returned the camera in perfect condition.",
      date: "2023-10-15"
    }
  },
  {
    id: "booking-2",
    listingId: "listing-2",
    renterId: "user-1",
    ownerId: "user-3",
    startDate: "2023-10-05",
    endDate: "2023-10-08",
    totalPrice: 60,
    status: "completed",
    createdAt: "2023-09-25",
    renterReview: {
      rating: 4,
      comment: "Great bike, minor scratches but works well.",
      date: "2023-10-10"
    }
  }
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Check local storage for saved bookings
    const savedBookings = localStorage.getItem("trusted-share-bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Load initial bookings if nothing in storage
      setBookings(initialBookings);
      localStorage.setItem("trusted-share-bookings", JSON.stringify(initialBookings));
    }
  }, []);

  const createBooking = (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("trusted-share-bookings", JSON.stringify(updatedBookings));
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking["status"], reason?: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { 
        ...booking, 
        status, 
        updatedAt: new Date().toISOString(),
        ...(reason && status === "disputed" ? { disputeReason: reason } : {})
      } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("trusted-share-bookings", JSON.stringify(updatedBookings));
  };

  const addReview = (bookingId: string, isOwner: boolean, rating: number, comment: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        const review = {
          rating,
          comment,
          date: new Date().toISOString()
        };
        
        return {
          ...booking,
          ...(isOwner ? { ownerReview: review } : { renterReview: review }),
          updatedAt: new Date().toISOString()
        };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    localStorage.setItem("trusted-share-bookings", JSON.stringify(updatedBookings));
  };

  const getUserBookings = (userId: string, asRenter: boolean) => {
    return bookings.filter(booking => 
      asRenter ? booking.renterId === userId : booking.ownerId === userId
    );
  };

  const getBookingsByListing = (listingId: string) => {
    return bookings.filter(booking => booking.listingId === listingId);
  };

  const getBooking = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings,
      addBooking: (booking: Booking) => setBookings([...bookings, booking]),
      createBooking, 
      updateBookingStatus, 
      addReview, 
      getUserBookings, 
      getBookingsByListing, 
      getBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
};
// Removed redundant declaration of BookingContextType
