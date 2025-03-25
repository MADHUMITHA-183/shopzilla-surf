
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-24",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold tracking-tight opacity-0 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Stores
        </Link>

        <nav className="hidden md:flex space-x-10 items-center opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-accent transition-colors">
            Products
          </Link>
          <Link to="/collections" className="text-sm font-medium hover:text-accent transition-colors">
            Collections
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-6 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/cart" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/account" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-24 px-6 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className="text-xl font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-xl font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/collections" 
            className="text-xl font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className="text-xl font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/account" 
            className="text-xl font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Account
          </Link>
          <div className="pt-6 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-xl font-medium">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
