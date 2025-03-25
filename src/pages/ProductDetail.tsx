
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Share, 
  ArrowRight,
  Star,
  Check
} from "lucide-react";

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Lighting",
    description: "Enhance your workspace with our sleek minimalist desk lamp. Featuring adjustable brightness levels and a modern design, this lamp provides optimal lighting for any task while adding a touch of elegance to your desk setup.",
    features: [
      "Adjustable brightness settings",
      "Touch-sensitive controls",
      "Energy-efficient LED",
      "Flexible arm for directional lighting",
      "5-year warranty"
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Furniture",
    description: "Experience ultimate comfort with our ergonomic office chair. Designed with lumbar support and breathable mesh, this chair helps maintain proper posture during long working hours. The adjustable features allow for customized comfort tailored to your specific needs.",
    features: [
      "Adjustable height and armrests",
      "Breathable mesh backrest",
      "Lumbar support",
      "360° swivel",
      "Durable construction"
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: "Wireless Charging Pad",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Electronics",
    description: "Simplify your charging experience with our wireless charging pad. Compatible with all Qi-enabled devices, this sleek charger eliminates cable clutter while providing fast and efficient charging. The minimalist design complements any space.",
    features: [
      "Qi wireless charging compatible",
      "Fast charging technology",
      "LED charging indicator",
      "Non-slip surface",
      "Compact design"
    ],
    rating: 4.6,
    reviews: 215,
    inStock: true
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1589003511763-bf9a76b23f13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    category: "Electronics",
    description: "Transform your home with our intelligent smart speaker. Featuring crystal-clear sound quality and advanced voice recognition, this speaker integrates seamlessly with your smart home ecosystem. Control your music, get information, and manage your connected devices with simple voice commands.",
    features: [
      "360° sound projection",
      "Voice assistant integration",
      "Multi-room synchronization",
      "Adaptive EQ technology",
      "Privacy-focused design"
    ],
    rating: 4.7,
    reviews: 178,
    inStock: false
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  // Find the product by ID
  const product = allProducts.find(p => p.id === Number(id));
  
  // Related products (exclude current product)
  const relatedProducts = allProducts
    .filter(p => p.id !== Number(id))
    .slice(0, 3);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-32 pb-16 px-6 md:px-12 lg:px-24 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link 
            to="/products"
            className="inline-flex items-center text-accent font-medium hover:underline"
          >
            Back to Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-900">{product.name}</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div className="opacity-0 animate-fade-in">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium tracking-wider mb-4 opacity-0 animate-fade-in">
                {product.category.toUpperCase()}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="text-2xl font-semibold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-600 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "250ms" }}>
                {product.description}
              </p>
              
              {/* Stock Status */}
              <div className="flex items-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
                {product.inStock ? (
                  <>
                    <span className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-2" />
                      In Stock
                    </span>
                  </>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "350ms" }}>
                <span className="mr-4 font-medium">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <button
                  className="flex-1 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center group transition-all duration-300"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-transparent hover:bg-gray-100 border border-gray-300 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  <Heart className="mr-2 w-5 h-5" />
                  Wishlist
                </button>
              </div>
              
              {/* Features */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "450ms" }}>
                <h3 className="font-medium text-lg mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-100 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Share</span>
                  <div className="flex space-x-4">
                    <button className="text-gray-500 hover:text-accent transition-colors">
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-16">
            <div className="border-b border-gray-200 mb-8">
              <div className="flex overflow-x-auto">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-6 py-3 font-medium text-sm border-b-2 transition-colors uppercase tracking-wider ${
                      activeTab === tab
                        ? "border-accent text-accent"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="opacity-0 animate-fade-in">
              {activeTab === "description" && (
                <div>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  <p className="text-gray-600">
                    Experience the perfect blend of form and function with our carefully designed products. Each item in our collection is created with attention to detail, ensuring both aesthetic appeal and practical usability. Our commitment to quality craftsmanship means you're investing in products built to last and enhance your everyday life.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Product Specifications</h3>
                    <div className="space-y-4">
                      <div className="flex border-b border-gray-100 pb-3">
                        <span className="font-medium w-1/3">Material</span>
                        <span className="text-gray-600 w-2/3">Premium aluminum and high-grade plastic</span>
                      </div>
                      <div className="flex border-b border-gray-100 pb-3">
                        <span className="font-medium w-1/3">Dimensions</span>
                        <span className="text-gray-600 w-2/3">12.5 x 8.3 x 4.2 inches</span>
                      </div>
                      <div className="flex border-b border-gray-100 pb-3">
                        <span className="font-medium w-1/3">Weight</span>
                        <span className="text-gray-600 w-2/3">1.5 lbs</span>
                      </div>
                      <div className="flex border-b border-gray-100 pb-3">
                        <span className="font-medium w-1/3">Color Options</span>
                        <span className="text-gray-600 w-2/3">Silver, Black, White</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-1/3">Warranty</span>
                        <span className="text-gray-600 w-2/3">5 years limited warranty</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Box Contents</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-accent" />
                        <span>1 x {product.name}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-accent" />
                        <span>User Manual</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-accent" />
                        <span>Power Adapter</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-accent" />
                        <span>Warranty Card</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="flex items-center mr-6">
                      <span className="text-3xl font-bold mr-2">{product.rating}</span>
                      <div className="flex flex-col">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                      </div>
                    </div>
                    <button className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm">
                      Write a Review
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-b border-gray-100 pb-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <span className="text-sm text-gray-500">2 weeks ago</span>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">
                          This product exceeded my expectations! The quality is outstanding, and it has significantly improved my daily routine. Highly recommend to anyone looking for a premium solution.
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button className="text-accent font-medium hover:underline">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-display font-bold tracking-tight opacity-0 animate-fade-in">
                Related Products
              </h2>
              <Link 
                to="/products" 
                className="group flex items-center text-accent font-medium opacity-0 animate-fade-in"
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
