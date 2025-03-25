
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium tracking-wider mb-4 opacity-0 animate-fade-in">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
                The Shopzilla Experience
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                We're committed to providing exceptional service and products that elevate your everyday life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "Every product is carefully selected and tested to ensure the highest quality standards",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Fast Shipping",
                  description: "We offer quick and reliable shipping options to get your products to you as soon as possible",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 17C8.10457 17 9 16.1046 9 15C9 13.8954 8.10457 13 7 13C5.89543 13 5 13.8954 5 15C5 16.1046 5.89543 17 7 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 17C18.1046 17 19 16.1046 19 15C19 13.8954 18.1046 13 17 13C15.8954 13 15 13.8954 15 15C15 16.1046 15.8954 17 17 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Secure Payments",
                  description: "Your transactions are protected with industry-leading security and encryption protocols",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="flex flex-col items-center text-center p-6 rounded-xl premium-card opacity-0 animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100 + 200}ms` }}
                >
                  <div className="bg-accent/10 rounded-full p-4 mb-6">
                    <div className="text-accent">{feature.icon}</div>
                  </div>
                  <h3 className="font-medium text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-accent rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 lg:p-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Join Our Community</h2>
                  <p className="text-white/80 mb-8 max-w-md">
                    Sign up to get exclusive access to new products, special offers, and community events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 flex-1"
                    />
                    <button className="bg-white text-accent hover:bg-white/90 px-6 py-3 rounded-lg font-medium transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="hidden md:block h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1600494603989-9650cf6dad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
                    alt="Community"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
