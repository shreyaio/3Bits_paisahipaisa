"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2 } from "lucide-react"

export default function SignUpPage() {
  const [verificationLevel, setVerificationLevel] = useState("basic")

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Join our community to start borrowing and lending items</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your neighborhood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="northside">Northside</SelectItem>
                        <SelectItem value="eastside">Eastside</SelectItem>
                        <SelectItem value="westside">Westside</SelectItem>
                        <SelectItem value="southside">Southside</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="phone">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name-phone">First name</Label>
                      <Input id="first-name-phone" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name-phone">Last name</Label>
                      <Input id="last-name-phone" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-phone">Password</Label>
                    <Input id="password-phone" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location-phone">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your neighborhood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="northside">Northside</SelectItem>
                        <SelectItem value="eastside">Eastside</SelectItem>
                        <SelectItem value="westside">Westside</SelectItem>
                        <SelectItem value="southside">Southside</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div>
                <Label>Verification Level</Label>
                <div className="grid gap-2 mt-2">
                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer ${
                      verificationLevel === "basic" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                    }`}
                    onClick={() => setVerificationLevel("basic")}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 mt-0.5 ${verificationLevel === "basic" ? "text-teal-500" : "text-gray-300"}`}
                    />
                    <div>
                      <div className="font-medium">Basic Verification</div>
                      <div className="text-sm text-gray-500">Email verification only</div>
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer ${
                      verificationLevel === "verified" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                    }`}
                    onClick={() => setVerificationLevel("verified")}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 mt-0.5 ${verificationLevel === "verified" ? "text-teal-500" : "text-gray-300"}`}
                    />
                    <div>
                      <div className="font-medium">ID Verification</div>
                      <div className="text-sm text-gray-500">Verify your identity with a government ID</div>
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 border rounded-lg p-3 cursor-pointer ${
                      verificationLevel === "community" ? "border-teal-500 bg-teal-50" : "border-gray-200"
                    }`}
                    onClick={() => setVerificationLevel("community")}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 mt-0.5 ${verificationLevel === "community" ? "text-teal-500" : "text-gray-300"}`}
                    />
                    <div>
                      <div className="font-medium">Community Verified</div>
                      <div className="text-sm text-gray-500">Complete 5 successful transactions</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-teal-600 hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-teal-600 hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-teal-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
