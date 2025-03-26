
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  stock = 0,
  index = 0,
}) => {
  const { toast } = useToast();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === id);
    
    // Check stock availability
    if (existingItemIndex >= 0) {
      // If item exists, check if adding one more would exceed stock
      const currentQuantity = existingCart[existingItemIndex].quantity;
      if (currentQuantity >= stock) {
        toast({
          title: "Stock limit reached",
          description: `Sorry, only ${stock} units of ${name} are available.`,
        });
        return;
      }
      // If stock is available, increase quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add it with quantity 1 if stock is available
      if (stock <= 0) {
        toast({
          title: "Out of stock",
          description: `Sorry, ${name} is currently out of stock.`,
        });
        return;
      }
      existingCart.push({
        id,
        name,
        price,
        image,
        category,
        stock,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch a custom event to notify other components of cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Also trigger storage event for cross-tab sync
    window.dispatchEvent(new Event('storage'));
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

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
              <div className="flex flex-col">
                <p className="font-semibold">₹{price.toFixed(2)}</p>
                <p className={`text-xs ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                </p>
              </div>
              <button 
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full flex items-center justify-center text-white transform hover:scale-105 active:scale-95 transition",
                  stock > 0 ? "bg-accent" : "bg-gray-400 cursor-not-allowed"
                )}
                aria-label="Add to cart"
                onClick={addToCart}
                disabled={stock <= 0}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
