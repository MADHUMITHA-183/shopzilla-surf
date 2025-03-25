
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { User, KeyRound, LockKeyhole } from "lucide-react";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'coordinator' | 'admin'>('student');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      // Redirect to home page or return URL
      const { state } = location;
      const returnUrl = state && (state as any).returnUrl ? (state as any).returnUrl : '/';
      navigate(returnUrl);
    }
  }, [navigate, location]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect to appropriate dashboard or return URL
      const { state } = location;
      const returnUrl = state && (state as any).returnUrl ? (state as any).returnUrl : '/';
      navigate(returnUrl);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !email || !password) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some((user: any) => user.email === email)) {
      toast({
        title: "Registration Failed",
        description: "Email already in use. Please use a different email.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      dateCreated: new Date().toISOString()
    };
    
    // Add user to storage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${name}!`,
    });
    
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Stores</h1>
            <p className="text-gray-600">Access your college supplies account</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'login' ? 'text-accent border-b-2 border-accent' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'register' ? 'text-accent border-b-2 border-accent' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>
            
            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="p-8">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent text-white rounded-lg py-3 font-medium hover:bg-accent/90 transition-colors"
                >
                  Sign In
                </button>
              </form>
            )}
            
            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="p-8">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'student' | 'coordinator' | 'admin')}
                  >
                    <option value="student">Student</option>
                    <option value="coordinator">Class Coordinator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent text-white rounded-lg py-3 font-medium hover:bg-accent/90 transition-colors"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
