import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Clock } from "lucide-react"
import FeaturedListings from "@/components/featured-listings"

export default function Home() {
  // Featured items data
  const featuredItems = [
    {
      id: 1,
      title: "Power Drill Set",
      category: "Tools",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=300",
      location: "Downtown",
      rating: 4.8,
      reviews: 24,
      available: true,
    },
    {
      id: 2,
      title: "Canon DSLR Camera",
      category: "Electronics",
      price: 25.0,
      image: "/placeholder.svg?height=200&width=300",
      location: "Westside",
      rating: 4.9,
      reviews: 37,
      available: true,
    },
    {
      id: 3,
      title: "Camping Tent (4-Person)",
      category: "Outdoors",
      price: 15.5,
      image: "/placeholder.svg?height=200&width=300",
      location: "Northside",
      rating: 4.7,
      reviews: 19,
      available: true,
    },
    {
      id: 4,
      title: "Board Game Collection",
      category: "Entertainment",
      price: 5.99,
      image: "/placeholder.svg?height=200&width=300",
      location: "Eastside",
      rating: 4.6,
      reviews: 12,
      available: false,
    },
  ]

  // Categories
  const categories = [
    { name: "Tools", icon: "🔨" },
    { name: "Electronics", icon: "📱" },
    { name: "Books", icon: "📚" },
    { name: "Party", icon: "🎉" },
    { name: "Sports", icon: "🏀" },
    { name: "Outdoors", icon: "🏕️" },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-emerald-500 py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Share More, Own Less</h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-[600px]">
                Borrow what you need, lend what you don't. Join our community of sharers and save money while reducing
                waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                  List an Item
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Browse Items
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="People sharing items in a community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center border-2 rounded-full p-2 shadow-sm">
              <Search className="ml-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="What do you need to borrow?"
                className="flex-1 p-2 pl-3 bg-transparent outline-none"
              />
              <Button className="rounded-full">Search</Button>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant="outline"
                  className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {category.icon} {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <FeaturedListings />

      {/* Featured Items */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Items</h2>
            <Link href="/items" className="text-teal-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 rounded-full bg-black/40">
                        Currently Borrowed
                      </span>
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2">{item.category}</Badge>
                </div>
                <CardContent className="pt-4">
                  <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{item.rating}</span>
                    <span className="text-gray-500 ml-1">({item.reviews} reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="font-bold text-lg">
                    ${item.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-500">/day</span>
                  </div>
                  <Button size="sm" variant={item.available ? "default" : "outline"} disabled={!item.available}>
                    {item.available ? "Borrow" : "Unavailable"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find What You Need</h3>
              <p className="text-gray-600">Browse thousands of items available in your neighborhood.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Borrow</h3>
              <p className="text-gray-600">Request the item for the dates you need and arrange pickup.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Return & Review</h3>
              <p className="text-gray-600">Return the item on time and leave a review to build trust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-teal-500 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-lg">Active Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-lg">Community Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg">Successful Borrows</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$250K+</div>
              <div className="text-lg">Community Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join our sharing community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sign up today and start borrowing or lending items in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
