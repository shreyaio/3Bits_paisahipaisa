
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
  X
} from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-[#396c35] hover:text-white transition-colors flex items-center gap-1">
            <Home size={18} />
            Home
          </Link>
          <Link to="/browse" className="text-sm font-medium text-[#396c35] hover:text-white transition-colors flex items-center gap-1">
            <Search size={18} />
            Browse
          </Link>
          <Link to="/list-item" className="text-sm font-medium text-[#396c35] hover:text-white transition-colors flex items-center gap-1">
            <PlusCircle size={18} />
            List Item
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user?.isLoggedIn ? (
            <>
              {/* Notification and Messages Icons */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/alerts" className="text-[#396c35] hover:text-white transition-colors">
                  <Bell size={20} />
                </Link>
                <Link to="/chat" className="text-[#396c35] hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </Link>
              </div>

              {/* User Avatar and Dropdown */}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-white"
                        >
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
            <div className="hidden md:block">
              <Link to="/auth">
                <Button variant="default" className="bg-brand-blue hover:bg-brand-teal">Log in</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/browse" 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search size={18} />
              Browse
            </Link>
            <Link 
              to="/list-item" 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PlusCircle size={18} />
              List Item
            </Link>
            
            {user?.isLoggedIn ? (
              <>
                <Link 
                  to="/alerts" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bell size={18} />
                  Alerts
                </Link>
                <Link 
                  to="/chat" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle size={18} />
                  Messages
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  Dashboard
                </Link>
                <button 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center justify-center p-2 bg-brand-blue text-white rounded hover:bg-brand-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in / Sign up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
