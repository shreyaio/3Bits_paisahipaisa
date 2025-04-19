"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Shield,
  Award,
  Clock,
  Calendar,
  MapPin,
  MessageCircle,
  Settings,
  Package,
  DollarSign,
  TrendingUp,
  BarChart,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  const [dashboardView, setDashboardView] = useState<"owner" | "renter">("owner")

  // This would normally be fetched from a database
  const user = {
    id: "user123",
    name: "John Doe",
    image: "/placeholder.svg?height=200&width=200",
    location: "Downtown",
    memberSince: "March 2022",
    bio: "Outdoor enthusiast and photography hobbyist. I love sharing my gear with others who share my passions!",
    responseRate: 98,
    responseTime: "within 1 hour",
    verificationLevel: "ID Verified",
    badges: [
      { name: "Super Lender", icon: <Award className="h-4 w-4" /> },
      { name: "Quick Responder", icon: <Clock className="h-4 w-4" /> },
      { name: "5-Star Host", icon: <Star className="h-4 w-4 fill-current" /> },
    ],
    stats: {
      itemsListed: 12,
      itemsBorrowed: 5,
      totalLent: 34,
      totalBorrowed: 8,
      rating: 4.9,
      reviews: 27,
      totalEarnings: 1250.75,
      pendingEarnings: 125.5,
    },
    listedItems: [
      {
        id: "item1",
        title: "Mountain Bike - Trek X-Caliber",
        category: "Sports",
        price: 15.0,
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.8,
        reviews: 12,
        available: true,
        timesRented: 8,
        totalEarnings: 450.0,
      },
      {
        id: "item2",
        title: "DSLR Camera Kit",
        category: "Electronics",
        price: 25.0,
        image: "/placeholder.svg?height=200&width=300",
        rating: 5.0,
        reviews: 8,
        available: true,
        timesRented: 15,
        totalEarnings: 625.75,
      },
      {
        id: "item3",
        title: "Camping Tent (4-Person)",
        category: "Outdoors",
        price: 12.5,
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.7,
        reviews: 5,
        available: false,
        timesRented: 4,
        totalEarnings: 175.0,
      },
    ],
    borrowedItems: [
      {
        id: "bitem1",
        title: "Pressure Washer",
        owner: "Sarah J.",
        borrowDate: "Aug 15 - Aug 17, 2023",
        image: "/placeholder.svg?height=200&width=300",
        status: "completed",
        rating: 5,
        feedback: "Great pressure washer, worked perfectly for my driveway cleaning project!",
      },
      {
        id: "bitem2",
        title: "Projector",
        owner: "Mike T.",
        borrowDate: "Oct 5 - Oct 7, 2023",
        image: "/placeholder.svg?height=200&width=300",
        status: "completed",
        rating: 4,
        feedback: "Good projector, but it was a bit dim in well-lit rooms.",
      },
    ],
    currentBookings: [
      {
        id: "booking1",
        itemTitle: "Mountain Bike - Trek X-Caliber",
        borrower: {
          name: "Emily L.",
          image: "/placeholder.svg?height=50&width=50",
          rating: 4.8,
          reviews: 7,
        },
        dates: "Apr 22 - Apr 24, 2023",
        status: "upcoming",
        price: 45.0,
        messages: [
          {
            sender: "borrower",
            text: "Hi! I'm excited to borrow your bike. Is it possible to pick it up a bit earlier on the 22nd?",
            timestamp: "Apr 18, 2023 10:23 AM",
          },
          {
            sender: "owner",
            text: "Sure, I can do anytime after 9am. Does that work for you?",
            timestamp: "Apr 18, 2023 11:05 AM",
          },
          {
            sender: "borrower",
            text: "Perfect! I'll come by around 10am then. Thanks!",
            timestamp: "Apr 18, 2023 11:12 AM",
          },
        ],
      },
    ],
    feedbackReceived: [
      {
        id: "feedback1",
        item: "Mountain Bike - Trek X-Caliber",
        borrower: "Alex M.",
        rating: 5,
        comment: "The bike was in perfect condition and John was very helpful explaining the gears. Great experience!",
        date: "Mar 15, 2023",
      },
      {
        id: "feedback2",
        item: "DSLR Camera Kit",
        borrower: "Jessica L.",
        rating: 5,
        comment:
          "Amazing camera kit! Everything was clean and well-maintained. John was super responsive and flexible with pickup times.",
        date: "Feb 28, 2023",
      },
      {
        id: "feedback3",
        item: "Camping Tent (4-Person)",
        borrower: "Michael T.",
        rating: 4,
        comment: "Good tent, kept us dry during light rain. One small tear on the rainfly but otherwise great.",
        date: "Jan 22, 2023",
      },
    ],
    monthlyEarnings: [
      { month: "Jan", amount: 120 },
      { month: "Feb", amount: 180 },
      { month: "Mar", amount: 240 },
      { month: "Apr", amount: 300 },
      { month: "May", amount: 210 },
      { month: "Jun", amount: 150 },
    ],
    popularItems: [
      { name: "DSLR Camera Kit", rentals: 15 },
      { name: "Mountain Bike", rentals: 8 },
      { name: "Camping Tent", rentals: 4 },
    ],
    inventoryStatus: {
      available: 10,
      rented: 1,
      maintenance: 1,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
        <div className="flex-shrink-0">
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={user.image || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
                <span>•</span>
                <span>Member since {user.memberSince}</span>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{user.stats.rating}</span>
                <span className="text-gray-600">({user.stats.reviews} reviews)</span>
                <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200">
                  <Shield className="h-3 w-3 mr-1" />
                  {user.verificationLevel}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button size="sm" className="gap-2">
                <Package className="h-4 w-4" />
                List an Item
              </Button>
            </div>
          </div>

          <p className="mt-4 text-gray-600">{user.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {user.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {badge.icon}
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard View Toggle */}
      <div className="flex justify-center mb-8">
        <Tabs
          value={dashboardView}
          onValueChange={(value) => setDashboardView(value as "owner" | "renter")}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="owner">Owner Dashboard</TabsTrigger>
            <TabsTrigger value="renter">Renter Dashboard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Owner Dashboard */}
      {dashboardView === "owner" && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Package className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">{user.stats.itemsListed}</div>
                <div className="text-sm text-gray-500">Items Listed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Calendar className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">{user.stats.totalLent}</div>
                <div className="text-sm text-gray-500">Times Lent</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <DollarSign className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">${user.stats.totalEarnings.toFixed(2)}</div>
                <div className="text-sm text-gray-500">Total Earnings</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mb-1" />
                <div className="text-2xl font-bold">{user.stats.rating}</div>
                <div className="text-sm text-gray-500">Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earnings Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
                <CardDescription>Your rental income over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {user.monthlyEarnings.map((month, i) => (
                    <div key={i} className="relative flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-teal-500 rounded-t-md"
                        style={{ height: `${(month.amount / 300) * 250}px` }}
                      ></div>
                      <span className="text-xs mt-2">{month.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                Your earnings increased by 25% compared to last month
              </CardFooter>
            </Card>

            {/* Popular Items */}
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Items</CardTitle>
                <CardDescription>Based on number of rentals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.popularItems.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{item.rentals} rentals</span>
                    </div>
                    <Progress value={(item.rentals / 15) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <BarChart className="h-4 w-4 mr-1" />
                Based on the last 6 months of activity
              </CardFooter>
            </Card>
          </div>

          {/* Inventory Status */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current status of your listed items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{user.inventoryStatus.available}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{user.inventoryStatus.rented}</div>
                  <div className="text-sm text-gray-600">Currently Rented</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{user.inventoryStatus.maintenance}</div>
                  <div className="text-sm text-gray-600">Under Maintenance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Current Bookings</CardTitle>
              <CardDescription>Manage your active and upcoming rentals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.currentBookings.length > 0 ? (
                user.currentBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{booking.itemTitle}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={booking.borrower.image || "/placeholder.svg"}
                              alt={booking.borrower.name}
                            />
                            <AvatarFallback>{booking.borrower.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{booking.borrower.name}</span>
                          <div className="flex items-center text-xs">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span>{booking.borrower.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{booking.dates}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge variant={booking.status === "upcoming" ? "outline" : "default"}>
                          {booking.status === "upcoming" ? "Upcoming" : "Active"}
                        </Badge>
                        <div className="font-bold">${booking.price.toFixed(2)}</div>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>

                    {/* Communication Log */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Communication</h4>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-3 max-h-40 overflow-y-auto">
                        {booking.messages.map((message, i) => (
                          <div
                            key={i}
                            className={`flex ${message.sender === "owner" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 text-sm ${
                                message.sender === "owner" ? "bg-teal-100 text-teal-800" : "bg-gray-100"
                              }`}
                            >
                              <p>{message.text}</p>
                              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No current bookings</h3>
                  <p className="text-gray-500">You'll see bookings for your items here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feedback Received */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>What borrowers are saying about your items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.feedbackReceived.map((feedback) => (
                  <div key={feedback.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{feedback.item}</h4>
                        <p className="text-sm text-gray-500">
                          From: {feedback.borrower} • {feedback.date}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fee Transparency */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Breakdown</CardTitle>
              <CardDescription>Understanding your earnings and platform fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h4>
                    <div className="text-2xl font-bold">${user.stats.totalEarnings.toFixed(2)}</div>
                    <p className="text-xs text-gray-500 mt-1">Lifetime earnings from all rentals</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Pending Earnings</h4>
                    <div className="text-2xl font-bold">${user.stats.pendingEarnings.toFixed(2)}</div>
                    <p className="text-xs text-gray-500 mt-1">Will be transferred within 3-5 business days</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Platform Fee Structure</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Service Fee</span>
                      <span>10% of rental price</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Processing</span>
                      <span>2.9% + $0.30 per transaction</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Insurance Coverage</span>
                      <span>5% of rental price</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total Platform Fee</span>
                      <span>~18% of rental price</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800">Fee Example</h4>
                      <p className="text-sm text-amber-700">
                        For a $100 rental, you would receive approximately $82 after all fees. Fees help cover platform
                        maintenance, payment processing, and insurance for your items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Renter Dashboard */}
      {dashboardView === "renter" && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Package className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">{user.stats.itemsBorrowed}</div>
                <div className="text-sm text-gray-500">Items Borrowed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Calendar className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">{user.stats.totalBorrowed}</div>
                <div className="text-sm text-gray-500">Total Rentals</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <DollarSign className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-2xl font-bold">${(user.stats.totalBorrowed * 20).toFixed(2)}</div>
                <div className="text-sm text-gray-500">Money Saved</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mb-1" />
                <div className="text-2xl font-bold">{user.stats.rating}</div>
                <div className="text-sm text-gray-500">Your Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Rental History */}
          <Card>
            <CardHeader>
              <CardTitle>Rental History</CardTitle>
              <CardDescription>Items you've borrowed in the past</CardDescription>
            </CardHeader>
            <CardContent>
              {user.borrowedItems.length > 0 ? (
                <div className="space-y-4">
                  {user.borrowedItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-0">
                      <div className="relative h-24 md:w-40 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">From: {item.owner}</p>
                        <div className="flex items-center text-sm mt-1">
                          <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{item.borrowDate}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Badge variant={item.status === "completed" ? "outline" : "default"}>
                            {item.status === "completed" ? "Completed" : "Active"}
                          </Badge>
                        </div>
                      </div>
                      <div className="md:w-1/3">
                        <div className="flex items-center mb-1">
                          <h4 className="text-sm font-medium">Your Rating:</h4>
                          <div className="flex ml-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{item.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No rental history yet</h3>
                  <p className="text-gray-500 mb-6">Browse items to borrow from your community</p>
                  <Link href="/items">
                    <Button>Browse Items</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feedback Received as Renter */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback from Owners</CardTitle>
              <CardDescription>What item owners are saying about you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Mountain Bike Rental</h4>
                      <p className="text-sm text-gray-500">From: Sarah J. • March 10, 2023</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    John was a great borrower! He returned the bike in perfect condition and was very communicative
                    throughout the process.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Pressure Washer</h4>
                      <p className="text-sm text-gray-500">From: Mike T. • February 15, 2023</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">Good renter, returned the item on time. Would rent to again.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your rental payments and security deposits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Item</th>
                        <th className="text-left p-3 text-sm font-medium">Date</th>
                        <th className="text-left p-3 text-sm font-medium">Amount</th>
                        <th className="text-left p-3 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-sm">Pressure Washer</td>
                        <td className="p-3 text-sm">Aug 15, 2023</td>
                        <td className="p-3 text-sm">$45.00</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm">Pressure Washer (Deposit)</td>
                        <td className="p-3 text-sm">Aug 17, 2023</td>
                        <td className="p-3 text-sm">$100.00</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Refunded
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm">Projector</td>
                        <td className="p-3 text-sm">Oct 5, 2023</td>
                        <td className="p-3 text-sm">$60.00</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-sm">Projector (Deposit)</td>
                        <td className="p-3 text-sm">Oct 7, 2023</td>
                        <td className="p-3 text-sm">$150.00</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Refunded
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Updates about your rentals and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Return Confirmed</h4>
                    <p className="text-sm text-green-700">
                      Your return of "Projector" has been confirmed by Mike T. Your deposit of $150.00 has been
                      refunded.
                    </p>
                    <p className="text-xs text-green-600 mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Upcoming Return</h4>
                    <p className="text-sm text-amber-700">
                      Reminder: Your rental of "Mountain Bike" is due to be returned tomorrow by 6:00 PM.
                    </p>
                    <p className="text-xs text-amber-600 mt-1">12 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">New Message</h4>
                    <p className="text-sm text-blue-700">Sarah J. sent you a message about your upcoming rental.</p>
                    <p className="text-xs text-blue-600 mt-1">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
