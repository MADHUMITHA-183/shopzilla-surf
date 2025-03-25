
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ClipboardList } from "lucide-react";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Submitted Successfully!</h1>
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
            <div className="mb-6 flex items-center justify-center text-accent">
              <ClipboardList className="mr-2 h-5 w-5" />
              <span className="font-medium">Order Status</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Your order has been sent to your class coordinator for approval. Once approved, 
              it will be forwarded to the admin for final processing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white">
                  <span className="text-sm font-medium">1</span>
                  <div className="absolute h-full w-0.5 bg-gray-200 top-8 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Order Submitted</h3>
                  <p className="text-sm text-gray-500">Your order has been received</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-medium">2</span>
                  <div className="absolute h-full w-0.5 bg-gray-200 top-8 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-600">Coordinator Approval</h3>
                  <p className="text-sm text-gray-500">Pending approval from your class coordinator</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-600">Admin Processing</h3>
                  <p className="text-sm text-gray-500">Final approval and processing by admin</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/orders" 
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
