"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, SlidersHorizontal, X } from "lucide-react"

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false)

  // Sample search results
  const searchResults = [
    {
      id: 1,
      title: "Power Drill Set",
      category: "Tools",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=300",
      location: "Downtown",
      distance: "0.8 miles away",
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
      distance: "1.2 miles away",
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
      distance: "2.5 miles away",
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
      distance: "3.1 miles away",
      rating: 4.6,
      reviews: 12,
      available: false,
    },
    {
      id: 5,
      title: "Mountain Bike",
      category: "Sports",
      price: 18.0,
      image: "/placeholder.svg?height=200&width=300",
      location: "Downtown",
      distance: "0.5 miles away",
      rating: 4.9,
      reviews: 31,
      available: true,
    },
    {
      id: 6,
      title: "Projector",
      category: "Electronics",
      price: 22.5,
      image: "/placeholder.svg?height=200&width=300",
      location: "Southside",
      distance: "4.2 miles away",
      rating: 4.8,
      reviews: 15,
      available: true,
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
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center border-2 rounded-full p-2 shadow-sm">
            <Search className="ml-2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="What do you need to borrow?"
              className="flex-1 p-2 pl-3 bg-transparent outline-none"
              defaultValue="drill"
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

      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">{searchResults.length} items found</div>

        <div className="flex items-center gap-4">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1 space-y-6 bg-white p-4 rounded-lg border lg:sticky lg:top-4 h-fit">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Price Range (per day)</h4>
              <div className="px-2">
                <Slider defaultValue={[25]} max={100} step={1} />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span>$0</span>
                <span>Up to $25</span>
                <span>$100+</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Distance</h4>
              <div className="px-2">
                <Slider defaultValue={[5]} max={10} step={1} />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span>0 mi</span>
                <span>Up to 5 miles</span>
                <span>10+ mi</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.name}`} />
                    <label
                      htmlFor={`category-${category.name}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.icon} {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="available-now" defaultChecked />
                  <label
                    htmlFor="available-now"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Available now
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="instant-book" />
                  <label
                    htmlFor="instant-book"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Instant book
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Owner Verification</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="id-verified" />
                  <label
                    htmlFor="id-verified"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ID Verified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="highly-rated" />
                  <label
                    htmlFor="highly-rated"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    4.5+ Rating
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1">
                Reset
              </Button>
              <Button className="flex-1">Apply</Button>
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item) => (
              <Link href={`/items/${item.id}`} key={item.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
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
                      <span>{item.distance}</span>
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
