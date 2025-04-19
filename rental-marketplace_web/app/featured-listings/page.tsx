import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"

export default function FeaturedListingsPage() {
  // Featured items data
  const featuredItems = [
    {
      id: 1,
      title: "Professional DSLR Camera Kit",
      category: "Electronics",
      price: 35.99,
      description: "Complete Canon EOS 5D Mark IV DSLR camera kit with multiple lenses and accessories.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 42,
      sponsored: true,
    },
    {
      id: 2,
      title: "Pressure Washer - Commercial Grade",
      category: "Tools",
      price: 28.5,
      description: "Heavy-duty 3000 PSI pressure washer, perfect for driveways, decks, and siding.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviews: 31,
      sponsored: true,
    },
    {
      id: 3,
      title: "Outdoor Party Tent (10x20ft)",
      category: "Party Supplies",
      price: 45.0,
      description: "Large waterproof canopy tent with sidewalls, perfect for events and gatherings.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 27,
      sponsored: false,
    },
    {
      id: 4,
      title: "Electric Bike - City Cruiser",
      category: "Sports",
      price: 39.99,
      description: "Comfortable electric bike with 40-mile range, perfect for city exploration.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviews: 19,
      sponsored: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Featured Listings</h1>
          <p className="text-gray-500 mt-2">Discover our most popular and high-quality rental items</p>
        </div>
        <Link href="/items" className="text-teal-600 hover:underline flex items-center">
          View all items
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              {item.sponsored && (
                <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">Sponsored</Badge>
              )}
              <Badge className="absolute top-2 left-2">{item.category}</Badge>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <div className="font-bold text-lg">
                  ${item.price}
                  <span className="text-sm font-normal text-gray-500">/day</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.description}</p>
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{item.rating}</span>
                <span className="text-gray-500 ml-1">({item.reviews} reviews)</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/items/${item.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
