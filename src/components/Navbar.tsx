
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onPricingClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPricingClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  const handlePricingClick = () => {
    if (onPricingClick) {
      onPricingClick();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleNavigation("/")}
            className="text-2xl font-semibold tracking-tight slide-in-transition hover:opacity-80"
            type="button"
          >
            Slide<span className="text-primary font-light">AI</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={handleNavigation("/features")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            Features
          </button>
          <button
            onClick={handlePricingClick}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            Pricing
          </button>
          <button
            onClick={handleNavigation("/templates")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            Templates
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2" type="button">
                    <User size={16} />
                    <span className="hidden md:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button 
                      onClick={handleNavigation("/account")} 
                      className="flex items-center gap-2 cursor-pointer w-full"
                      type="button"
                    >
                      <Settings size={16} />
                      Account Settings
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 cursor-pointer w-full"
                      type="button"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                className="group" 
                type="button"
                onClick={handleNavigation("/create")}
              >
                <span className="flex items-center gap-1">
                  Create presentation
                  <ChevronRight
                    size={16}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden md:flex hover:bg-secondary transition-all"
                type="button"
                onClick={handleNavigation("/auth")}
              >
                Log in
              </Button>
              <Button 
                className="group" 
                type="button"
                onClick={handleNavigation("/auth?tab=signup")}
              >
                <span className="flex items-center gap-1">
                  Get started
                  <ChevronRight
                    size={16}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
