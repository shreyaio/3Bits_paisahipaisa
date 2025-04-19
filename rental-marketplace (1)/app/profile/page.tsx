import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Shield, Award, Clock, Calendar, MapPin, MessageCircle, Settings, Package, Heart } from "lucide-react"

export default function ProfilePage() {
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
      },
      {
        id: "bitem2",
        title: "Projector",
        owner: "Mike T.",
        borrowDate: "Oct 5 - Oct 7, 2023",
        image: "/placeholder.svg?height=200&width=300",
        status: "completed",
      },
    ],
    currentBookings: [
      {
        id: "booking1",
        itemTitle: "Mountain Bike - Trek X-Caliber",
        borrower: "Emily L.",
        dates: "Apr 22 - Apr 24, 2023",
        status: "upcoming",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Profile Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mb-1" />
            <div className="text-2xl font-bold">{user.stats.rating}</div>
            <div className="text-sm text-gray-500">Rating</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <MessageCircle className="h-5 w-5 text-teal-600 mb-1" />
            <div className="text-2xl font-bold">{user.responseRate}%</div>
            <div className="text-sm text-gray-500">Response Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="listed">
        <TabsList className="w-full">
          <TabsTrigger value="listed" className="flex-1">
            My Listed Items
          </TabsTrigger>
          <TabsTrigger value="borrowed" className="flex-1">
            Borrowed Items
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1">
            Current Bookings
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">
            Saved Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listed" className="mt-6">
          {user.listedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.listedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{item.rating}</span>
                      <span className="text-gray-500 ml-1">({item.reviews} reviews)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold">
                        ${item.price.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500">/day</span>
                      </div>
                      <Link href={`/items/${item.id}`}>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
                <Package className="h-8 w-8 text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-600 mb-2">List a new item</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Share your items with the community</p>
                <Link href="/items/new">
                  <Button>List an Item</Button>
                </Link>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No items listed yet</h3>
              <p className="text-gray-500 mb-6">Start sharing your items with the community</p>
              <Link href="/items/new">
                <Button>List Your First Item</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="borrowed" className="mt-6">
          {user.borrowedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.borrowedItems.map((item) => (
                <Card key={item.id} className="flex overflow-hidden">
                  <div className="relative h-auto w-1/3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4 flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">From: {item.owner}</p>
                    <div className="flex items-center text-sm mb-3">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <span>{item.borrowDate}</span>
                    </div>
                    <Badge variant={item.status === "completed" ? "outline" : "default"}>
                      {item.status === "completed" ? "Completed" : "Active"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No borrowed items yet</h3>
              <p className="text-gray-500 mb-6">Browse items to borrow from your community</p>
              <Link href="/items">
                <Button>Browse Items</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          {user.currentBookings.length > 0 ? (
            <div className="space-y-4">
              {user.currentBookings.map((booking) => (
                <Card key={booking.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{booking.itemTitle}</h3>
                      <p className="text-sm text-gray-600">Borrower: {booking.borrower}</p>
                      <div className="flex items-center text-sm mt-1">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{booking.dates}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={booking.status === "upcoming" ? "outline" : "default"}>
                        {booking.status === "upcoming" ? "Upcoming" : "Active"}
                      </Badge>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No current bookings</h3>
              <p className="text-gray-500">You'll see bookings for your items here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No saved items yet</h3>
            <p className="text-gray-500 mb-6">Save items you're interested in borrowing later</p>
            <Link href="/items">
              <Button>Browse Items</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
