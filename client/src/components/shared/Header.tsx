import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Bell, Menu, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const [notificationCount] = useState(2);

  const navItems = [
    { label: "Home", path: "/", dropdown: true },
    { label: "Hotels", path: "/hotels", dropdown: true },
    { label: "Pages", path: "#", dropdown: true },
    { label: "Blog", path: "/blog", dropdown: true },
    { label: "Shortcode", path: "#", dropdown: true },
    { label: "Extra", path: "#", dropdown: true },
  ];

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path !== "#") {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <header className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4">
        {/* Top header */}
        <div className="flex justify-between items-center py-2 text-sm border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1">
                <span>ENG</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1">
                <span>USD</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="p-0 h-auto"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-white text-[10px]">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span>Adam Smith</span>
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/my-bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link href="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main header */}
        <nav className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <span className="text-primary font-bold text-2xl">G</span>
            <span className="text-white font-bold text-2xl">westy</span>
          </Link>

          <div
            className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative left-0 top-full md:top-auto z-50 w-full md:w-auto bg-secondary md:bg-transparent py-4 md:py-0 px-4 md:px-0 md:items-center md:space-x-6`}
          >
            {navItems.map((item) => (
              <div key={item.label} className="py-2 md:py-0 relative group">
                <Link
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={`flex items-center space-x-1 hover:text-primary ${
                    location === item.path ? "text-primary" : ""
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && <ChevronDown className="h-3 w-3" />}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-1" /> Submit Hotel
            </Button>
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
