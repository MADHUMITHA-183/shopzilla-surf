
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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

const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch only 4 products for the featured section
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(4);

        if (error) {
          throw error;
        }

        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        toast({
          title: "Error",
          description: "Failed to load featured products. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs font-medium tracking-wider mb-4 opacity-0 animate-fade-in">
              FEATURED
            </span>
            <h2 className="text-3xl font-display font-bold tracking-tight mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              College Essentials
            </h2>
            <p className="text-gray-600 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Everything you need for your academic success, from study materials to official college uniforms.
            </p>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center text-accent font-medium opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              index={index + 1}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
