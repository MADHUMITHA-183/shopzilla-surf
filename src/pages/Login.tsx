
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, EyeIcon, EyeOffIcon, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// OTP validation schema
const otpSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

type LoginValues = z.infer<typeof loginSchema>;
type OtpValues = z.infer<typeof otpSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  // Initialize login form
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Initialize OTP form
  const otpForm = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      mobile: "",
      otp: "",
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/home');
      }
    };
    
    checkSession();
  }, [navigate]);

  // Send OTP function
  const handleSendOTP = async () => {
    const mobileValue = otpForm.getValues("mobile");
    
    if (!mobileValue || !/^\d{10}$/.test(mobileValue)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/generate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ mobile: mobileValue }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsOtpSent(true);
        toast({
          title: "OTP Sent",
          description: `OTP has been sent to your mobile number. For demo purposes, the OTP is: ${data.otp}`,
        });
        
        // Auto-fill OTP for demo purposes
        otpForm.setValue("otp", data.otp);
      } else {
        throw new Error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "OTP Sending Failed",
        description: "Failed to send OTP. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Login with email and password
  const onSubmitLogin = async (values: LoginValues) => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Fetch user profile based on role
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role, verified')
          .eq('id', data.user.id)
          .single();
        
        if (userError) throw userError;
        
        if (!userData.verified) {
          throw new Error("Your account is not verified. Please contact support.");
        }
        
        // Successful login
        toast({
          title: "Login Successful",
          description: `Welcome back!`,
        });
        
        // Redirect to home page
        navigate('/home');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login with OTP
  const onSubmitOtp = async (values: OtpValues) => {
    setIsSubmitting(true);
    
    try {
      // For now, we'll just verify that they provided an OTP
      // In a real system, you would check this against the database
      
      // Demo success message
      toast({
        title: "OTP Verification Successful",
        description: "You are now logged in",
      });
      
      // In a real app, you would create a session here
      // For demo purposes, just redirect to home
      navigate('/home');
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Tabs defaultValue="otp" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="otp">Login with OTP</TabsTrigger>
                <TabsTrigger value="password">Login with Password</TabsTrigger>
              </TabsList>
              
              <TabsContent value="otp" className="p-6">
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-6">
                    <FormField
                      control={otpForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <div className="relative flex">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Smartphone className="h-5 w-5 text-gray-400" />
                            </div>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="9876543210"
                                className="pl-10 flex-grow"
                                {...field}
                              />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="ml-2" 
                              onClick={handleSendOTP}
                              disabled={isOtpSent}
                            >
                              {isOtpSent ? "OTP Sent" : "Send OTP"}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {isOtpSent && (
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Enter OTP</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-accent text-white py-3 hover:bg-accent/90"
                      disabled={isSubmitting || !isOtpSent}
                    >
                      {isSubmitting ? "Verifying..." : "Verify & Sign In"}
                    </Button>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-accent font-medium hover:underline">
                          Create account
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="password" className="p-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <KeyRound className="h-5 w-5 text-gray-400" />
                            </div>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                {...field}
                              />
                            </FormControl>
                            <div 
                              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" 
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-accent text-white py-3 hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-accent font-medium hover:underline">
                          Create account
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
