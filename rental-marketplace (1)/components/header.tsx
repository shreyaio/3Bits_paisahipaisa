"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, Heart, Package } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-teal-600">
              ShareSpot
            </Link>
            <nav className="hidden ml-10 md:flex items-center gap-6">
              <Link href="/items" className="text-gray-600 hover:text-teal-600 transition-colors">
                Browse Items
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-teal-600 transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-teal-600 transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Saved
                </Button>
                <Button variant="default" className="gap-2">
                  <Package className="h-4 w-4" />
                  List an Item
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-teal-100 text-teal-800">JD</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                  Log in
                </Button>
                <Button onClick={() => setIsLoggedIn(true)}>Sign up</Button>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/items"
              className="block py-2 text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Items
            </Link>
            <Link
              href="/how-it-works"
              className="block py-2 text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="pt-4 border-t">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-teal-100 text-teal-800">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500">john@example.com</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Heart className="h-4 w-4" />
                    Saved Items
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Package className="h-4 w-4" />
                    List an Item
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
                    onClick={() => {
                      setIsLoggedIn(false)
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setIsLoggedIn(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign up
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsLoggedIn(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Log in
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
