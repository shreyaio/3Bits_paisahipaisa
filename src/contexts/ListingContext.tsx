import React, { createContext, useState, useContext, useEffect } from "react";

interface ListingLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Listing {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  images: string[];
  pricePerDay: number;
  pricePerWeek?: number;
  location: ListingLocation;
  minRentalDays: number;
  maxRentalDays?: number;
  depositFee: number;
  availableDates?: { start: string; end: string }[];
  tags: string[];
  rating?: number;
  reviews?: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  createdAt: string;
  updatedAt?: string;
}

interface ListingContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "createdAt" | "tags">) => void;
  updateListing: (id: string, data: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  getListing: (id: string) => Listing | undefined;
  getUserListings: (userId: string) => Listing[];
  searchListings: (query: string) => Listing[];
  filterListings: (filters: Record<string, any>) => Listing[];
}

// Sample initial listings
const initialListings: Listing[] = [
  {
    id: "listing-1",
    ownerId: "user-1",
    title: "Professional DSLR Camera",
    description: "Perfect for photography enthusiasts. Includes tripod and extra lenses.",
    category: "Electronics",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=350&fit=crop"],
    pricePerDay: 35,
    pricePerWeek: 200,
    location: {
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    minRentalDays: 1,
    maxRentalDays: 14,
    depositFee: 50,
    tags: ["Popular", "High-End", "Electronics"],
    rating: 4.8,
    reviews: [
      {
        userId: "user-2",
        userName: "Jane Smith",
        rating: 5,
        comment: "Excellent camera, worked perfectly for my photoshoot!",
        date: "2023-10-15"
      }
    ],
    createdAt: "2023-09-01"
  },
  {
    id: "listing-2",
    ownerId: "user-3",
    title: "Mountain Bike",
    description: "26-inch wheels, 21 speeds, perfect for trail riding.",
    category: "Sports & Outdoors",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=500&h=350&fit=crop"],
    pricePerDay: 20,
    pricePerWeek: 120,
    location: {
      address: "456 Park Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94108",
      coordinates: {
        lat: 37.7824,
        lng: -122.4259
      }
    },
    minRentalDays: 1,
    maxRentalDays: 30,
    depositFee: 10,
    tags: ["Outdoors", "Sports", "Eco-Friendly"],
    rating: 4.5,
    reviews: [
      {
        userId: "user-1",
        userName: "John Doe",
        rating: 4,
        comment: "Great bike, minor scratches but works well.",
        date: "2023-10-10"
      }
    ],
    createdAt: "2023-09-15"
  },
  {
    id: "listing-3",
    ownerId: "user-2",
    title: "Camping Tent (4-Person)",
    description: "Waterproof tent with easy setup. Perfect for family camping trips.",
    category: "Sports & Outdoors",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=350&fit=crop"],
    pricePerDay: 15,
    pricePerWeek: 90,
    location: {
      address: "789 Beach Rd",
      city: "Santa Cruz",
      state: "CA",
      zipCode: "95060",
      coordinates: {
        lat: 36.9741,
        lng: -122.0308
      }
    },
    minRentalDays: 2,
    maxRentalDays: 14,
    depositFee: 20,
    tags: ["Outdoors", "Camping", "Eco-Friendly"],
    rating: 4.7,
    reviews: [
      {
        userId: "user-3",
        userName: "Alex Johnson",
        rating: 5,
        comment: "Excellent tent, stayed dry during rain!",
        date: "2023-09-20"
      }
    ],
    createdAt: "2023-08-15"
  }
];

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Check local storage for saved listings
    const savedListings = localStorage.getItem("trusted-share-listings");
    if (savedListings) {
      setListings(JSON.parse(savedListings));
    } else {
      // Load initial listings if nothing in storage
      setListings(initialListings);
      localStorage.setItem("trusted-share-listings", JSON.stringify(initialListings));
    }
  }, []);

  const addListing = (listing: Omit<Listing, "id" | "createdAt" | "tags">) => {
    // Generate tags based on listing properties
    const generatedTags = generateTags(listing);
    
    const newListing: Listing = {
      ...listing,
      depositFee: listing.depositFee, // Ensure depositFee is included
      id: `listing-${Date.now()}`,
      createdAt: new Date().toISOString(),
      tags: generatedTags
    };
    
    const updatedListings = [...listings, newListing];
    setListings(updatedListings);
    localStorage.setItem("trusted-share-listings", JSON.stringify(updatedListings));
    return newListing;
  };

  const generateTags = (listing: Omit<Listing, "id" | "createdAt" | "tags">) => {
    const tags: string[] = [];
    
    // Add category as a tag
    tags.push(listing.category);
    
    // Add condition-based tags
    if (listing.condition === "New" || listing.condition === "Like New") {
      tags.push("High-Quality");
    }
    
    // Add price-based tags
    if (listing.pricePerDay <= 20) {
      tags.push("Budget-Friendly");
    } else if (listing.pricePerDay >= 50) {
      tags.push("Premium");
    }
    
    // Add duration-based tags
    if (listing.minRentalDays === 1) {
      tags.push("Short-Term");
    }
    if (listing.maxRentalDays && listing.maxRentalDays >= 14) {
      tags.push("Long-Term-Available");
    }
    
    return tags;
  };

  const updateListing = (id: string, data: Partial<Listing>) => {
    const updatedListings = listings.map(listing => 
      listing.id === id ? { ...listing, ...data, updatedAt: new Date().toISOString() } : listing
    );
    setListings(updatedListings);
    localStorage.setItem("trusted-share-listings", JSON.stringify(updatedListings));
  };

  const deleteListing = (id: string) => {
    const updatedListings = listings.filter(listing => listing.id !== id);
    setListings(updatedListings);
    localStorage.setItem("trusted-share-listings", JSON.stringify(updatedListings));
  };

  const getListing = (id: string) => {
    return listings.find(listing => listing.id === id);
  };

  const getUserListings = (userId: string) => {
    return listings.filter(listing => listing.ownerId === userId);
  };

  const searchListings = (query: string) => {
    if (!query) return listings;
    
    const lowerCaseQuery = query.toLowerCase();
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(lowerCaseQuery) ||
      listing.description.toLowerCase().includes(lowerCaseQuery) ||
      listing.category.toLowerCase().includes(lowerCaseQuery) ||
      listing.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  };

  const filterListings = (filters: Record<string, any>) => {
    return listings.filter(listing => {
      let matches = true;
      
      if (filters.category && filters.category !== "All" && listing.category !== filters.category) {
        matches = false;
      }
      
      if (filters.condition && listing.condition !== filters.condition) {
        matches = false;
      }
      
      if (filters.minPrice && listing.pricePerDay < filters.minPrice) {
        matches = false;
      }
      
      if (filters.maxPrice && listing.pricePerDay > filters.maxPrice) {
        matches = false;
      }
      
      if (filters.location && !listing.location.city.includes(filters.location)) {
        matches = false;
      }
      
      return matches;
    });
  };

  return (
    <ListingContext.Provider value={{ 
      listings, 
      addListing, 
      updateListing, 
      deleteListing, 
      getListing, 
      getUserListings, 
      searchListings, 
      filterListings 
    }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingProvider");
  }
  return context;
};
