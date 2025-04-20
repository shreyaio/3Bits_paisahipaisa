import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useListings } from "@/contexts/ListingContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ItemCard from "@/components/shared/ItemCard";
import { Search, Check, TrendingUp, Shield, ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  const { listings } = useListings();
  const { user } = useAuth();
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  
  // References for sections that will have scroll animations
  const sectionsRef = useRef({});

  useEffect(() => {
    if (listings.length > 0) {
      const randomListings = [...listings]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(4, listings.length));
      setFeaturedListings(randomListings);
    }
  }, [listings]);

  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    Object.keys(sectionsRef.current).forEach((id) => {
      if (sectionsRef.current[id]) {
        observer.observe(sectionsRef.current[id]);
      }
    });

    return () => {
      Object.keys(sectionsRef.current).forEach((id) => {
        if (sectionsRef.current[id]) {
          observer.unobserve(sectionsRef.current[id]);
        }
      });
    };
  }, []);

  // Register a section ref
  const registerSection = (id, el) => {
    if (el && !sectionsRef.current[id]) {
      sectionsRef.current[id] = el;
    }
  };

  const categories = [
    { name: "Electronics", icon: "📱", color: "bg-[#F1F9DB]" },
    { name: "Home & Garden", icon: "🏡", color: "bg-[#F1F9DB]" },
    { name: "Sports & Outdoors", icon: "🚲", color: "bg-[#F1F9DB]" },
    { name: "Tools", icon: "🔧", color: "bg-[#F1F9DB]" },
    { name: "Clothing", icon: "👕", color: "bg-[#F1F9DB]" },
    { name: "Party & Events", icon: "🎉", color: "bg-[#F1F9DB]" },
  ];

  return (
    <Layout>
      {/* Hero Section - Modern Bento Style */}
      <section className="bg-gradient-to-b from-[#A3D80D] to-[#e0f0cf] text-[#171816] py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 2px, transparent 0)",
            backgroundSize: "30px 30px"
          }}
        ></div>
        <div 
          id="hero"
          ref={(el) => registerSection("hero", el)}
          className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-200">
              Rent What You Need, Share What You Own
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 transition-all duration-700 delay-300">
              Join our trust-centered community where you can safely rent items from verified users or share your belongings to earn extra income.
            </p>
            <div className="flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400">
              <Link to="/browse">
                <Button className="font-medium px-12 py-6 text-lg md:text-xl relative group overflow-hidden" variant="secondary">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <Search className="mr-2 h-10 w-10" />
                  Browse Items
                </Button>
              </Link>
              <Link to={user?.isLoggedIn ? "/list-item" : "/auth"}>
                <Button className="font-medium px-12 py-6 text-lg md:text-xl relative group overflow-hidden bg-white text-[#A3D80D] hover:bg-gray-100">
                  <span className="absolute inset-0 bg-[#A3D80D] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  List Your Item
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-${i} ${15 + i * 3}s infinite alternate ease-in-out`,
              }}
            />
          ))}
        </div>
      </section>


      {/* Categories - Bento Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="categories"
            ref={(el) => registerSection("categories", el)}
            className={`transition-all duration-1000 transform ${isVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-[#171816]">
              Popular Categories
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From electronics to outdoor gear, find whatever you need in our diverse categories.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl transition-all duration-500 delay-${index * 100} transform ${isVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <Link
                    to={`/browse?category=${category.name}`}
                    className="flex flex-col items-center p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 bg-white shadow hover:shadow-md relative group h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D80D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`text-4xl mb-3 p-5 rounded-full ${category.color} transform group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <span className="font-medium text-[#171816]">{category.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings - Bento Grid */}
      <section className="py-16 bg-[#F1F9DB]">
        <div className="container mx-auto px-4">
          <div 
        id="featuredListings"
        ref={(el) => registerSection("featuredListings", el)}
        className={`transition-all duration-1000 transform ${isVisible.featuredListings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#171816]">
            Featured Items
          </h2>
          <div>
            <Link to="/browse" className="text-[#A3D80D] hover:underline font-medium group flex items-center">
          View All
          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-2">
          {featuredListings.map((listing, index) => (
            <Link 
          to={`/item/${listing.id}`} 
          key={listing.id} 
          className={`hover:shadow-xl transition-all duration-500 rounded-xl group transform ${isVisible.featuredListings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: `${index * 100}ms` }}
            >
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#A3D80D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <ItemCard listing={listing} />
          </div>
            </Link>
          ))}
        </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety - Bento Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="trustSafety"
            ref={(el) => registerSection("trustSafety", el)}
            className={`flex flex-col md:flex-row gap-12 items-center transition-all duration-1000 transform ${isVisible.trustSafety ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#171816]">Trust & Safety First</h2>
              <p className="text-lg text-gray-600 mb-6">
                At TrustShare, we prioritize building a safe community where you can rent and lend with confidence.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Verified Users", desc: "Every verified member has had their identity confirmed." },
                  { title: "Secure Messaging", desc: "Communicate directly through our platform to arrange rentals." },
                  { title: "Review System", desc: "Read and write reviews to help build our trusted community." },
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start group transition-all duration-500 delay-${i * 200} transform ${isVisible.trustSafety ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="mr-4 mt-1 bg-[#F1F9DB] rounded-full p-1 group-hover:bg-[#A3D80D]/20 transition-colors duration-300">
                      <Check className="h-5 w-5 text-[#A3D80D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#171816]">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={`mt-8 transition-all duration-500 delay-300 transform ${isVisible.trustSafety ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Link to="/policies">
                  <Button variant="outline" className="group">
                    Learn More About Safety
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className={`md:w-1/2 transition-all duration-1000 delay-200 transform ${isVisible.trustSafety ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div className="rounded-2xl overflow-hidden shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#A3D80D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src="/7bde7239-0c3f-461b-9da2-e245f191ee70_750x422.jpg"
                  alt="People shaking hands"
                  className="rounded-lg shadow-md w-full transform group-hover:scale-105 transition-transform duration-700"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Bento Box */}
      <section className="py-16 bg-gradient-to-r from-[#A3D80D] to-[#F1F9DB] text-[#171816] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 3px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        ></div>
        <div 
          id="cta"
          ref={(el) => registerSection("cta", el)}
          className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 transform ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl font-bold mb-6 transition-all duration-700 delay-200">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto transition-all duration-700 delay-300">
            Start renting or sharing today and be part of the sustainable sharing economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400">
            <Link to={user?.isLoggedIn ? "/dashboard" : "/auth"}>
              <Button size="lg" variant="secondary" className="font-medium group relative overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <Sparkles className="mr-2 h-5 w-5" />
                {user?.isLoggedIn ? "Go to Dashboard" : "Sign Up Now"}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements using CSS animations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 80 + 40}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-bubble-${i} ${12 + i * 4}s infinite alternate ease-in-out`,
              }}
            />
          ))}
        </div>
      </section>

      {/* CSS animations */}
      <style>{`
        @keyframes float-0 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, 50px) rotate(45deg); }
        }
        @keyframes float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-40px, 30px) rotate(-30deg); }
        }
        @keyframes float-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(50px, -30px) rotate(60deg); }
        }
        @keyframes float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, -50px) rotate(-45deg); }
        }
        @keyframes float-4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(40px, 40px) rotate(90deg); }
        }
        @keyframes float-5 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-50px, 20px) rotate(-60deg); }
        }

        @keyframes float-bubble-0 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, 30px) rotate(30deg); }
        }
        @keyframes float-bubble-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, 20px) rotate(-20deg); }
        }
        @keyframes float-bubble-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(40px, -20px) rotate(40deg); }
        }
        @keyframes float-bubble-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-20px, -30px) rotate(-30deg); }
        }
      `}</style>
    </Layout>
  );
};

export default Home;