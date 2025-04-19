"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, MessageCircle, DollarSign, Star } from "lucide-react"

interface Notification {
  id: string
  type: "message" | "return" | "payment" | "feedback" | "alert"
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "return",
      title: "Return Confirmed",
      description:
        'Your return of "Projector" has been confirmed by Mike T. Your deposit of $150.00 has been refunded.',
      time: "2 days ago",
      read: false,
    },
    {
      id: "n2",
      type: "alert",
      title: "Upcoming Return",
      description: 'Reminder: Your rental of "Mountain Bike" is due to be returned tomorrow by 6:00 PM.',
      time: "12 hours ago",
      read: false,
    },
    {
      id: "n3",
      type: "message",
      title: "New Message",
      description: "Sarah J. sent you a message about your upcoming rental.",
      time: "1 week ago",
      read: true,
    },
    {
      id: "n4",
      type: "payment",
      title: "Payment Received",
      description: 'You received $45.00 for your "DSLR Camera Kit" rental.',
      time: "2 weeks ago",
      read: true,
    },
    {
      id: "n5",
      type: "feedback",
      title: "New Feedback",
      description: 'Alex M. left a 5-star review for your "Mountain Bike".',
      time: "3 weeks ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "return":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-emerald-500" />
      case "feedback":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-50"
      case "return":
        return "bg-green-50"
      case "payment":
        return "bg-emerald-50"
      case "feedback":
        return "bg-yellow-50"
      case "alert":
        return "bg-amber-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 sm:w-96 z-50 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="message" className="text-xs">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="return" className="text-xs">
                  Returns
                </TabsTrigger>
                <TabsTrigger value="payment" className="text-xs">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="alert" className="text-xs">
                  Alerts
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start p-3 rounded-lg ${getNotificationBg(notification.type)} ${!notification.read ? "border-l-4 border-teal-500" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notifications found</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
