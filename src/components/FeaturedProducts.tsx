
import React from "react";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// College products data
const featuredProducts = [
  {
    id: 1,
    name: "Record Note",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Notes"
  },
  {
    id: 2,
    name: "ID Card Holder",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Laptop Bag",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Black Hoodie",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Uniform"
  }
];

const FeaturedProducts: React.FC = () => {
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
              {...product}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
