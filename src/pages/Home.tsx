
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useListings } from "@/contexts/ListingContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ItemCard from "@/components/shared/ItemCard";
import { Search, Check, TrendingUp, Shield } from "lucide-react";

const Home = () => {
  const { listings } = useListings();
  const { user } = useAuth();
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    // Get 4 random listings as featured
    if (listings.length > 0) {
      const randomListings = [...listings]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(4, listings.length));
      setFeaturedListings(randomListings);
    }
  }, [listings]);

  const categories = [
    { name: "Electronics", icon: "📱", color: "bg-purple-100" },
    { name: "Home & Garden", icon: "🏡", color: "bg-green-100" },
    { name: "Sports & Outdoors", icon: "🚲", color: "bg-blue-100" },
    { name: "Tools", icon: "🔧", color: "bg-amber-100" },
    { name: "Clothing", icon: "👕", color: "bg-pink-100" },
    { name: "Party & Events", icon: "🎉", color: "bg-red-100" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-purple text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rent What You Need, Share What You Own
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join our trust-centered community where you can safely rent items from verified users or share your belongings to earn extra income.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/browse">
                <Button size="lg" variant="secondary" className="font-medium">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Items
                </Button>
              </Link>
              <Link to={user?.isLoggedIn ? "/list-item" : "/auth"}>
                <Button size="lg" className="font-medium bg-white text-brand-blue hover:bg-gray-100">
                  List Your Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-brand-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find What You Need</h3>
              <p className="text-gray-600">
                Browse thousands of items available in your area. Filter by category, condition, and price.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-brand-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book With Confidence</h3>
              <p className="text-gray-600">
                Our verified user system ensures you're renting from trusted community members.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-brand-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share & Earn</h3>
              <p className="text-gray-600">
                List your unused items and earn money while helping others in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Categories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From electronics to outdoor gear, find whatever you need in our diverse categories.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/browse?category=${category.name}`}
                className="flex flex-col items-center p-6 rounded-lg text-center transition-transform hover:scale-105"
              >
                <div className={`text-3xl mb-3 p-4 rounded-full ${category.color}`}>
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Items</h2>
            <Link to="/browse" className="text-brand-blue hover:underline font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <ItemCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-brand-purple/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Trust & Safety First</h2>
              <p className="text-lg text-gray-600 mb-6">
                At TrustShare, we prioritize building a safe community where you can rent and lend with confidence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Verified Users</h3>
                    <p className="text-gray-600">Every verified member has had their identity confirmed.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Messaging</h3>
                    <p className="text-gray-600">Communicate directly through our platform to arrange rentals.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Review System</h3>
                    <p className="text-gray-600">Read and write reviews to help build our trusted community.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/policies">
                  <Button variant="outline">Learn More About Safety</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
                alt="People shaking hands"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start renting or sharing today and be part of the sustainable sharing economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={user?.isLoggedIn ? "/dashboard" : "/auth"}>
              <Button size="lg" variant="secondary" className="font-medium">
                {user?.isLoggedIn ? "Go to Dashboard" : "Sign Up Now"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
