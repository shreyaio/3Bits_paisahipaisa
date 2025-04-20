import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useListings } from "@/contexts/ListingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { Upload, DollarSign, Info } from "lucide-react";

// Define schema for validation
const listingFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  condition: z.enum(["New", "Like New", "Good", "Fair"], { message: "Please select a valid condition." }),
  pricePerDay: z.coerce.number().positive({ message: "Price must be greater than 0." }),
  location: z.string().min(1, { message: "Location is required." }),
  minRentalDays: z.coerce.number().min(1, { message: "Minimum rental period must be at least 1 day." }),
  maxRentalDays: z.coerce.number().min(1, { message: "Maximum rental period must be at least 1 day." }),
}).refine((data) => data.maxRentalDays >= data.minRentalDays, {
  message: "Maximum rental period must be greater than or equal to minimum rental period.",
  path: ["maxRentalDays"],
});

const ListItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { addListing } = useListings();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      condition: "New",
      pricePerDay: 0,
      location: "",
      minRentalDays: 1,
      maxRentalDays: 7,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof listingFormSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to list an item.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const newListing = {
      id: Math.random().toString(36).substring(2, 9),
      ownerId: user.id,
      ownerName: user.name,
      title: values.title,
      category: values.category,
      description: values.description,
      condition: values.condition as "New" | "Like New" | "Good" | "Fair",
      pricePerDay: values.pricePerDay,
      location: { city: values.location, state: "", address: "Default Address", zipCode: "00000" }, // Adjust to match ListingLocation structure
      minRentalDays: values.minRentalDays,
      maxRentalDays: values.maxRentalDays,
      image: imagePreview || "https://images.unsplash.com/photo-1612900641809-92f551b0a565?w=400&h=300&fit=crop",
      images: [imagePreview || "https://images.unsplash.com/photo-1612900641809-92f551b0a565?w=400&h=300&fit=crop"], // Added images property
      rating: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    addListing(newListing);
    
    toast({
      title: "Listing created",
      description: "Your item has been successfully listed.",
    });
    
    navigate("/dashboard");
  };

  const categories = [
    "Electronics", "Home & Garden", "Sports & Outdoors", 
    "Tools", "Clothing", "Party & Events"
  ];
  
  const conditions = ["New", "Like New", "Good", "Fair"];

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">List Your Item</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Title</FormLabel>
                            <FormControl>
                              <Input placeholder="What are you listing?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {conditions.map(condition => (
                                    <SelectItem key={condition} value={condition}>
                                      {condition}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your item in detail" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Include details like brand, model, features, and any restrictions.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div 
                        className="border rounded-lg p-4"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      >
                        <div className="font-medium mb-4">Item Image</div>
                        <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 mb-4">
                          {imagePreview ? (
                            <div className="relative w-full">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="mx-auto max-h-[200px] object-contain"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setImagePreview(null)}
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 mb-2">
                                Drag and drop an image, or click to browse
                              </p>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                              />
                              <label htmlFor="image-upload">
                                <Button type="button" variant="outline" size="sm">
                                  Select Image
                                </Button>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="pricePerDay"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price Per Day</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                  <Input type="number" className="pl-10" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="minRentalDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Min. Rental Days</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="maxRentalDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max. Rental Days</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button type="submit">List Your Item</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="font-medium flex items-center mb-4">
                  <Info className="mr-2 h-5 w-5 text-blue-500" />
                  Listing Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>Include clear photos from multiple angles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>Be specific about condition and any wear or damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>Set clear rental terms including late fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>Mention any safety instructions or requirements</span>
                  </li>
                </ul>
                
                <div className="border-t mt-6 pt-6">
                  <h3 className="font-medium mb-3">Preview (Coming Soon)</h3>
                  <p className="text-sm text-gray-500">
                    A preview of your listing will appear here after you fill out the details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListItem;

