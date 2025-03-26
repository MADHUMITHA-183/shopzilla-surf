
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filter products by category
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    if (sortOrder === "name") return a.name.localeCompare(b.name);
    if (sortOrder === "stock-desc") return b.stock - a.stock;
    if (sortOrder === "stock-asc") return a.stock - b.stock;
    // Default: featured
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  <option value="stock-desc">Stock: High to Low</option>
                  <option value="stock-asc">Stock: Low to High</option>
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
                    <option value="stock-desc">Stock: High to Low</option>
                    <option value="stock-asc">Stock: Low to High</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    stock={product.stock}
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
