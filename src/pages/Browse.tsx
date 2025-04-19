
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useListings } from "@/contexts/ListingContext";
import Layout from "@/components/layout/Layout";
import ItemCard from "@/components/shared/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";

const Browse = () => {
  const { listings } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredListings, setFilteredListings] = useState(listings);
  
  // Categories for filter dropdown
  const categories = [
    "All Categories",
    "Electronics", 
    "Home & Garden", 
    "Sports & Outdoors", 
    "Tools", 
    "Clothing", 
    "Party & Events"
  ];
  
  // Conditions for filter dropdown
  const conditions = ["All Conditions", "New", "Like New", "Good", "Fair"];

  // Apply filters when filter conditions change
  useEffect(() => {
    let results = [...listings];
    
    // Apply search query filter
    if (searchQuery) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Apply condition filter
    if (selectedCondition && selectedCondition !== "All Conditions") {
      results = results.filter(item => item.condition === selectedCondition);
    }
    
    // Apply price filter
    results = results.filter(item => 
      item.pricePerDay >= priceRange[0] && item.pricePerDay <= priceRange[1]
    );
    
    setFilteredListings(results);
  }, [listings, searchQuery, selectedCategory, selectedCondition, priceRange]);

  // Update URL params when search changes
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedCategory && selectedCategory !== "All Categories") params.set("category", selectedCategory);
    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedCondition("All Conditions");
    setPriceRange([0, 500]);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {/* Search section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`md:w-1/4 lg:w-1/5 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2 text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <Select 
                    value={selectedCondition} 
                    onValueChange={setSelectedCondition}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    defaultValue={priceRange}
                    max={500}
                    step={10}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter location"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <Button className="w-full" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-grow">
            {/* Results header */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold">
                    {filteredListings.length} Results
                    {searchQuery ? ` for "${searchQuery}"` : ''}
                  </h1>
                  {(selectedCategory && selectedCategory !== "All Categories") && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Category: {selectedCategory}
                    </div>
                  )}
                </div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ItemCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
                <p className="text-gray-500 mb-6">
                  We couldn't find any items matching your search criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
