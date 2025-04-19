
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Listing } from "@/contexts/ListingContext";
import StarRating from "./StarRating";
import VerificationBadge from "./VerificationBadge";
import { Heart } from "lucide-react";

interface ItemCardProps {
  listing: Listing;
  ownerVerificationStatus?: "verified" | "basic" | "none";
}

const ItemCard = ({ listing, ownerVerificationStatus = "basic" }: ItemCardProps) => {
  // Take the first image as the main image
  const mainImage = listing.images.length > 0 ? listing.images[0] : "https://via.placeholder.com/300x200";

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/item/${listing.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          {ownerVerificationStatus === "verified" && (
            <div className="absolute top-2 right-2">
              <VerificationBadge status="verified" />
            </div>
          )}
          <button className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-sm hover:text-brand-pink">
            <Heart size={18} className="text-gray-600" />
          </button>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg truncate">{listing.title}</h3>
          <span className="font-semibold text-brand-blue">${listing.pricePerDay}/day</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={listing.rating || 0} size="sm" />
          {listing.reviews && (
            <span className="text-sm text-gray-500">({listing.reviews.length})</span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{listing.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {listing.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-500">
        <div>
          {listing.location.city}, {listing.location.state}
        </div>
        <div>
          Min: {listing.minRentalDays} day{listing.minRentalDays > 1 ? 's' : ''}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
