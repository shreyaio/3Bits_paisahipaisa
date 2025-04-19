"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, X, HelpCircle, Info, Check } from "lucide-react"

export default function NewItemPage() {
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=200&width=300"])
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    description: "",
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: "",
    deposit: "",
    minDuration: "1",
    maxDuration: "30",
    rentalCap: "0",
    instantBook: false,
    idRequired: true,
    rules: "",
    neighborhood: "",
    pickupInstructions: "",
  })

  const addImage = () => {
    if (images.length < 8) {
      setImages([...images, "/placeholder.svg?height=200&width=300"])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData({ ...formData, [id]: checked })
  }

  const nextTab = () => {
    if (activeTab === "details") setActiveTab("pricing")
    else if (activeTab === "pricing") setActiveTab("terms")
    else if (activeTab === "terms") setActiveTab("preview")
  }

  const prevTab = () => {
    if (activeTab === "preview") setActiveTab("terms")
    else if (activeTab === "terms") setActiveTab("pricing")
    else if (activeTab === "pricing") setActiveTab("details")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">List Your Item</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="details" className="flex flex-col sm:flex-row sm:gap-2">
              <span className="hidden sm:inline">1.</span> Item Details
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex flex-col sm:flex-row sm:gap-2">
              <span className="hidden sm:inline">2.</span> Pricing
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex flex-col sm:flex-row sm:gap-2">
              <span className="hidden sm:inline">3.</span> Terms
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex flex-col sm:flex-row sm:gap-2">
              <span className="hidden sm:inline">4.</span> Preview
            </TabsTrigger>
          </TabsList>

          {/* Item Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Item Photos</CardTitle>
                <CardDescription>
                  Add up to 8 photos of your item. Clear, well-lit photos help borrowers see your item.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-gray-50">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Item image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {images.length < 8 && (
                    <button
                      onClick={addImage}
                      className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-xs">Add Photo</span>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide details about your item to help borrowers find it.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Professional DSLR Camera Kit"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tools">Tools</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="party">Party Supplies</SelectItem>
                        <SelectItem value="outdoors">Outdoors</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="worn">Worn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail. Include features, specifications, and any other relevant information."
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={nextTab}>Continue to Pricing</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Availability</CardTitle>
                <CardDescription>Set your rental price and availability preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                    <Input
                      id="dailyRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.dailyRate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weeklyRate">Weekly Rate ($)</Label>
                    <Input
                      id="weeklyRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.weeklyRate}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-gray-500">Consider offering a discount for weekly rentals</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyRate">Monthly Rate ($)</Label>
                    <Input
                      id="monthlyRate"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.monthlyRate}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-gray-500">Consider offering a discount for monthly rentals</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit ($)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="deposit"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.deposit}
                      onChange={handleInputChange}
                    />
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                    We recommend setting a deposit to cover potential damage or loss.
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minDuration">Minimum Rental Period</Label>
                    <Select
                      value={formData.minDuration}
                      onValueChange={(value) => handleSelectChange("minDuration", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDuration">Maximum Rental Period</Label>
                    <Select
                      value={formData.maxDuration}
                      onValueChange={(value) => handleSelectChange("maxDuration", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select maximum period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="14">2 weeks</SelectItem>
                        <SelectItem value="30">1 month</SelectItem>
                        <SelectItem value="90">3 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rentalCap">Rental Cap Per Month</Label>
                    <Select
                      value={formData.rentalCap}
                      onValueChange={(value) => handleSelectChange("rentalCap", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rental cap" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No limit</SelectItem>
                        <SelectItem value="1">1 time per month</SelectItem>
                        <SelectItem value="2">2 times per month</SelectItem>
                        <SelectItem value="3">3 times per month</SelectItem>
                        <SelectItem value="4">4 times per month</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Limit how many times your item can be rented per month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button onClick={nextTab}>Continue to Terms</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Borrowing Rules</CardTitle>
                <CardDescription>Set rules and requirements for borrowers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>ID Verification Required</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="idRequired"
                      checked={formData.idRequired}
                      onCheckedChange={(checked) => handleSwitchChange("idRequired", checked)}
                    />
                    <Label htmlFor="idRequired">Require borrowers to verify their identity</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Instant Book</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="instantBook"
                      checked={formData.instantBook}
                      onCheckedChange={(checked) => handleSwitchChange("instantBook", checked)}
                    />
                    <Label htmlFor="instantBook">Allow borrowers to book without prior approval</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Rental Terms & Conditions</Label>
                  <Textarea
                    id="rules"
                    placeholder="Add any specific rules or requirements for borrowers (e.g., no international travel, return in same condition, etc.)"
                    rows={4}
                    value={formData.rules}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup & Return Location</CardTitle>
                <CardDescription>Specify where borrowers can pick up and return your item.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Neighborhood</Label>
                  <Select
                    value={formData.neighborhood}
                    onValueChange={(value) => handleSelectChange("neighborhood", value)}
                  >
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
                  <p className="text-xs text-gray-500">
                    For safety, we only show your general neighborhood until a booking is confirmed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupInstructions">Pickup Instructions</Label>
                  <Textarea
                    id="pickupInstructions"
                    placeholder="Provide instructions for pickup and return (will only be shared after booking confirmation)"
                    rows={3}
                    value={formData.pickupInstructions}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button onClick={nextTab}>Preview Listing</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Preview</CardTitle>
                <CardDescription>Review your listing before publishing it.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <img
                        src={images[0] || "/placeholder.svg"}
                        alt="Item preview"
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">{formData.category || "Category"}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Item image ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{formData.title || "Item Title"}</h3>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{formData.condition || "Condition"}</Badge>
                      <Badge variant="outline">{formData.neighborhood || "Location"}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="border rounded-md p-2">
                        <div className="text-sm text-gray-500">Daily</div>
                        <div className="font-bold">${formData.dailyRate || "0.00"}</div>
                      </div>
                      <div className="border rounded-md p-2">
                        <div className="text-sm text-gray-500">Weekly</div>
                        <div className="font-bold">${formData.weeklyRate || "0.00"}</div>
                      </div>
                      <div className="border rounded-md p-2">
                        <div className="text-sm text-gray-500">Monthly</div>
                        <div className="font-bold">${formData.monthlyRate || "0.00"}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-gray-600">{formData.description || "No description provided."}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Rental Terms</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4 text-gray-400" />
                          <span>Min: {formData.minDuration || "1"} day(s)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4 text-gray-400" />
                          <span>Max: {formData.maxDuration || "30"} day(s)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4 text-gray-400" />
                          <span>Deposit: ${formData.deposit || "0.00"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {formData.instantBook ? (
                            <>
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Instant Book</span>
                            </>
                          ) : (
                            <>
                              <Info className="h-4 w-4 text-gray-400" />
                              <span>Request to Book</span>
                            </>
                          )}
                        </div>
                      </div>

                      {formData.rules && (
                        <div className="mt-2 text-sm text-gray-600 border-t pt-2">
                          <p>{formData.rules}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish Listing</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
