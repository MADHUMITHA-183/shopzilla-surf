
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium tracking-wider mb-4 opacity-0 animate-fade-in">
              NEW COLLECTION
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Discover Our <br /> Premium Products
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Elevate your shopping experience with our curated selection of high-quality products designed for modern living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link
                to="/products"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center group transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/collections"
                className="bg-transparent hover:bg-gray-100 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                Explore Collections
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative opacity-0 animate-scale-in">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
                alt="Hero product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-4 md:p-6 max-w-[280px] opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-full p-2 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Premium Quality</h3>
                  <p className="text-sm text-gray-600">Crafted with attention to every detail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
