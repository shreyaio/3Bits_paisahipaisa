import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock, Shield, AlertCircle, Heart } from "lucide-react"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from a database
  const item = {
    id: params.id,
    title: "Professional DSLR Camera Kit",
    category: "Electronics",
    price: 25.0,
    deposit: 150.0,
    description:
      "Complete Canon EOS 5D Mark IV DSLR camera kit with 24-70mm lens, 70-200mm lens, flash, tripod, and carrying case. Perfect for professional photography, events, or trying out professional equipment before purchasing. Everything is in excellent condition and well maintained.",
    condition: "Excellent",
    rules: [
      "Valid ID and deposit required",
      "Return in the same condition",
      "No international travel without prior approval",
      "Damage will result in additional charges",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    location: {
      neighborhood: "Downtown",
      distance: "1.2 miles away",
    },
    owner: {
      id: "user123",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      reviews: 37,
      responseRate: 98,
      responseTime: "within 1 hour",
      verified: true,
      memberSince: "March 2022",
    },
    reviews: [
      {
        id: "rev1",
        user: {
          name: "Michael T.",
          image: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "August 15, 2023",
        comment:
          "The camera was in perfect condition and Sarah was very helpful explaining how to use some of the features. Would definitely borrow again!",
      },
      {
        id: "rev2",
        user: {
          name: "Jessica L.",
          image: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "July 3, 2023",
        comment:
          "Great experience! The camera kit had everything I needed for my weekend photoshoot. Sarah was flexible with pickup and drop-off times.",
      },
      {
        id: "rev3",
        user: {
          name: "David R.",
          image: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        date: "June 22, 2023",
        comment:
          "Camera worked great for my event. Only giving 4 stars because one of the batteries wasn't fully charged, but Sarah was very apologetic about it.",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column - Images */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {item.images.slice(1, 4).map((image, index) => (
              <div key={index} className="relative h-[150px] rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${item.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">
                  Rules
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews ({item.reviews.length})
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-gray-700">{item.description}</p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Category</h4>
                      <p>{item.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Condition</h4>
                      <p>{item.condition}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Deposit Required</h4>
                      <p>${item.deposit.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">ID Verification</h4>
                      <p>Required</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rules" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Borrowing Rules</h3>
                  <ul className="space-y-2">
                    {item.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-800 h-5 w-5 text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        {rule}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-amber-800">Important Note</h4>
                        <p className="text-sm text-amber-700">
                          By borrowing this item, you agree to the owner's rules and our{" "}
                          <Link href="/terms" className="underline">
                            Terms of Service
                          </Link>
                          . You are responsible for any damage beyond normal wear and tear.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">{item.owner.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(item.owner.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{item.owner.reviews} reviews</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {item.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.user.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                          <div className="ml-auto flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>
                      {item.location.neighborhood} • {item.location.distance}
                    </span>
                  </div>

                  <div className="relative h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Map view will be displayed here</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Exact location will be provided after your booking is confirmed
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column - Booking and Owner */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
                    <div className="text-gray-500">per day</div>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">
                      {item.owner.rating} ({item.owner.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">When do you need it?</h3>
                  <Calendar mode="range" className="rounded-md border" />
                </div>

                <Button className="w-full">Request to Borrow</Button>

                <div className="text-center text-sm text-gray-500">You won't be charged yet</div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <div>${item.price.toFixed(2)} x 3 days</div>
                    <div>${(item.price * 3).toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div>Service fee</div>
                    <div>${(item.price * 0.1 * 3).toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <div>Total</div>
                    <div>${(item.price * 3 + item.price * 0.1 * 3).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.owner.image || "/placeholder.svg"} alt={item.owner.name} />
                  <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{item.owner.name}</h3>
                    {item.owner.verified && (
                      <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Member since {item.owner.memberSince}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">
                      {item.owner.rating} • {item.owner.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Responds {item.owner.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{item.owner.responseRate}% response rate</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Contact {item.owner.name.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
