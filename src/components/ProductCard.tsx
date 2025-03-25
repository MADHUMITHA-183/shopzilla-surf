
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  index = 0,
}) => {
  return (
    <div 
      className="opacity-0 animate-fade-in group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="premium-card overflow-hidden flex flex-col h-full">
          <div className="product-image-container aspect-square bg-gray-50">
            <img
              src={image}
              alt={name}
              className="product-image w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{category}</div>
            <h3 className="font-medium text-base sm:text-lg mb-1 group-hover:text-accent transition-colors">{name}</h3>
            <div className="mt-auto flex justify-between items-center pt-3">
              <p className="font-semibold">${price.toFixed(2)}</p>
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full flex items-center justify-center bg-accent text-white transform hover:scale-105 active:scale-95 transition"
                aria-label="Add to cart"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
