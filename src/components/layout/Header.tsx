import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  PlusCircle,
  Bell,
  MessageCircle,
  User,
  LogOut,
  Menu,
  X,
  Heart,
  MapPin
} from "lucide-react";

// Location Input Component with City & Country Select
const LocationInput = ({ setLocationLabel }: { setLocationLabel: (label: string) => void }) => {
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSave = () => {
    const label = `${city}, India (${pincode})`;
    setLocationLabel(label);
  };

  const cities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  return (
    <div className="p-4 w-64 space-y-2">
      <select
        className="w-full border rounded px-2 py-2 text-sm"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Pincode"
        className="w-full border rounded px-2 py-2 text-sm"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <Button onClick={handleSave} className="w-full mt-2 bg-lime-600 text-white">
        Save Location
      </Button>
    </div>
  );
};

// Location Dropdown Button
const LocationDropdown = ({ locationLabel, setLocationLabel }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-[#396c35] hover:text-white flex items-center gap-1"
        >
          <MapPin size={18} />
          {locationLabel || "Set Location"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-white shadow-lg border rounded-md">
        <LocationInput setLocationLabel={setLocationLabel} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Main Header
const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationLabel, setLocationLabel] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-lime-600 text-white p-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                <path d="M8 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
                <path d="M15 11h-2v9" />
              </svg>
            </div>
            <span className="font-bold text-xl">TrustShare</span>
          </Link>
          {/* Location button (desktop) */}
          <div className="hidden md:block">
            <LocationDropdown locationLabel={locationLabel} setLocationLabel={setLocationLabel} />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-[#396c35] hover:text-[#709a6d] flex items-center gap-1">
            <Home size={18} /> Home
          </Link>
          <Link to="/browse" className="text-sm font-medium text-[#396c35] hover:text-[#709a6d] flex items-center gap-1">
            <Search size={18} /> Browse
          </Link>
          <Link to="/list-item" className="text-sm font-medium text-[#396c35] hover:text-[#709a6d] flex items-center gap-1">
            <PlusCircle size={18} /> List Item
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user?.isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Link to="/alerts" className="text-[#396c35] hover:text-[#709a6d]"><Bell size={20} /></Link>
                <Link to="/wishlist" className="text-[#396c35] hover:text-[#709a6d]"><Heart size={20} /></Link>
                <Link to="/chat" className="text-[#396c35] hover:text-[#709a6d]"><MessageCircle size={20} /></Link>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-lime-600 text-white p-1 rounded">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user.verificationStatus === "verified" && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 p-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                          className="h-3 w-3 text-white">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth" className="hidden md:block">
              <Button className="bg-[#396c35] hover:bg-[#8cbc89]">Log in</Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <LocationDropdown locationLabel={locationLabel} setLocationLabel={setLocationLabel} />
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse</Link>
          <Link to="/list-item" onClick={() => setMobileMenuOpen(false)}>List Item</Link>

          {user?.isLoggedIn ? (
            <>
              <Link to="/alerts" onClick={() => setMobileMenuOpen(false)}>Alerts</Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
              <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }}>Log out</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Log in / Sign up</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
