import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter, X } from "lucide-react";

// College products data
const allProducts = [
  {
    id: 1,
    name: "Record Note",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Notes"
  },
  {
    id: 2,
    name: "Theory Note",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Notes"
  },
  {
    id: 3,
    name: "Observation Note",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Notes"
  },
  {
    id: 4,
    name: "Time Book",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Notes"
  },
  {
    id: 5,
    name: "ID Card Holder",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Accessories"
  },
  {
    id: 6,
    name: "ID Card Strap",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Accessories"
  },
  {
    id: 7,
    name: "Shirt Piece",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Uniform"
  },
  {
    id: 8,
    name: "Pant Piece",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Uniform"
  },
  {
    id: 9,
    name: "Black T-shirt",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Uniform"
  },
  {
    id: 10,
    name: "Hoodie",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Uniform"
  },
  {
    id: 11,
    name: "Toolkit",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Equipment"
  },
  {
    id: 12,
    name: "Laptop",
    price: 45999.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Equipment"
  },
  {
    id: 13,
    name: "Laptop Bag",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Accessories"
  },
  {
    id: 14,
    name: "Sports T-shirt",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Sports"
  },
  {
    id: 15,
    name: "Shoes",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Sports"
  },
  {
    id: 16,
    name: "HRP Book",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Books"
  }
];

// Get unique categories
const categories = ["All", ...Array.from(new Set(allProducts.map(product => product.category)))];

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("featured");

  // Filter products by category
  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    if (sortOrder === "name") return a.name.localeCompare(b.name);
    // Default: featured
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 opacity-0 animate-fade-in">College Essentials</h1>
            <p className="text-gray-600 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Browse our collection of essential items for your academic journey.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activeCategory === category
                            ? "bg-accent text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">Price Range</h3>
                  <div className="bg-gray-100 h-1 rounded-full relative mb-4">
                    <div className="absolute left-1/4 right-1/2 h-1 bg-accent rounded-full"></div>
                    <div className="absolute left-1/4 top-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent transform -translate-y-1/2"></div>
                    <div className="absolute right-1/2 top-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent transform -translate-y-1/2"></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">₹0</span>
                    <span className="text-sm">₹50,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Button */}
            <div className="md:hidden flex justify-between items-center mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center text-sm font-medium px-3 py-2 border border-gray-300 rounded-lg"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Mobile Filters Sidebar */}
            <div
              className={cn(
                "fixed inset-0 bg-white z-50 px-6 py-20 transition-transform duration-300 md:hidden",
                mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-bold mb-8">Filters</h2>
              
              <div className="mb-8">
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setActiveCategory(category);
                          setMobileFiltersOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg transition-colors",
                          activeCategory === category
                            ? "bg-accent text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Price Range</h3>
                <div className="bg-gray-100 h-1 rounded-full relative mb-4">
                  <div className="absolute left-1/4 right-1/2 h-1 bg-accent rounded-full"></div>
                  <div className="absolute left-1/4 top-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent transform -translate-y-1/2"></div>
                  <div className="absolute right-1/2 top-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent transform -translate-y-1/2"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">₹0</span>
                  <span className="text-sm">₹50,000</span>
                </div>
              </div>
              
              <div className="mt-10">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="hidden md:flex justify-end mb-6">
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
