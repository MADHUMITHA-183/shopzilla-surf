
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 px-6 md:px-12 lg:px-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold tracking-tight mb-6 inline-block">
              shopzilla
            </Link>
            <p className="text-gray-600 mb-6 max-w-xs">
              Premium e-commerce platform designed with quality and simplicity in mind.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-accent transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-gray-600 hover:text-accent transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/discounts" className="text-gray-600 hover:text-accent transition-colors">
                  Discounts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-r-lg transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} shopzilla. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-600 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-accent text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
