
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  KeyRound, 
  Mail, 
  BookOpen, 
  CalendarDays, 
  Smartphone, 
  EyeIcon, 
  EyeOffIcon, 
  CheckCircle 
} from "lucide-react";
import Footer from "@/components/Footer";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  course: z.string()
    .min(2, { message: "Course must be at least 2 characters" })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Course must contain only letters, numbers and spaces" }),
  email: z.string().email({ message: "Invalid email address" })
    .regex(/^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
      message: "Only Gmail and valid email addresses are allowed",
    }),
  year: z.number()
    .int()
    .min(1, { message: "Year must be a positive number" })
    .max(6, { message: "Year cannot exceed 6" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
  confirmPassword: z.string(),
  mobile: z.string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  role: z.enum(["student", "faculty", "admin"]),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      course: "",
      email: "",
      year: undefined,
      password: "",
      confirmPassword: "",
      mobile: "",
      role: "student",
      otp: "",
      agreeToTerms: false,
    },
  });
  
  // Send OTP function
  const handleSendOTP = async () => {
    const mobileValue = form.getValues("mobile");
    
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
        form.setValue("otp", data.otp);
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
  
  // Verify OTP function
  const handleVerifyOTP = () => {
    const otpValue = form.getValues("otp");
    
    if (!otpValue || otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would verify the OTP with your backend
    // For demo purposes, we'll just accept any 6-digit OTP entered
    setOtpVerified(true);
    toast({
      title: "OTP Verified",
      description: "Your mobile number has been verified successfully.",
    });
  };
  
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!isOtpSent || !otpVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your mobile number by requesting and verifying an OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Create user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      
      if (authError) throw authError;
      
      if (!authData.user?.id) {
        throw new Error("Failed to create user");
      }
      
      // 2. Add user to our custom users table
      const { error: userError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email: values.email,
          password: values.password, // In production, never store raw passwords
          mobile: values.mobile,
          role: values.role,
          verified: true, // Since we verified via OTP
        }
      ]);
      
      if (userError) throw userError;
      
      // 3. Add profile based on role
      if (values.role === "student") {
        const { error: profileError } = await supabase.from('student_profiles').insert([
          {
            id: authData.user.id,
            full_name: values.fullName,
            course: values.course,
            year: values.year,
          }
        ]);
        
        if (profileError) throw profileError;
      } else if (values.role === "faculty") {
        const { error: profileError } = await supabase.from('faculty_profiles').insert([
          {
            id: authData.user.id,
            full_name: values.fullName,
            department: values.course,
            position: "Lecturer", // Default position
          }
        ]);
        
        if (profileError) throw profileError;
      } else if (values.role === "admin") {
        const { error: profileError } = await supabase.from('admin_profiles').insert([
          {
            id: authData.user.id,
            full_name: values.fullName,
            admin_level: "Standard",
          }
        ]);
        
        if (profileError) throw profileError;
      }
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center items-center pt-8 pb-8 px-6">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-600">Sign up to access college supplies and services</p>
          </div>
          
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Fill in your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Step 1: Mobile Verification (Default Step) */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
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
                              disabled={isOtpSent && otpVerified}
                            >
                              {isOtpSent && otpVerified ? (
                                <span className="flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                  Verified
                                </span>
                              ) : isOtpSent ? (
                                "Resend OTP"
                              ) : (
                                "Send OTP"
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {isOtpSent && !otpVerified && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Enter OTP</FormLabel>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="h-10 w-10 rounded-md border" />
                                    <InputOTPSlot index={1} className="h-10 w-10 rounded-md border" />
                                    <InputOTPSlot index={2} className="h-10 w-10 rounded-md border" />
                                    <InputOTPSlot index={3} className="h-10 w-10 rounded-md border" />
                                    <InputOTPSlot index={4} className="h-10 w-10 rounded-md border" />
                                    <InputOTPSlot index={5} className="h-10 w-10 rounded-md border" />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="button"
                          variant="secondary"
                          className="w-full" 
                          onClick={handleVerifyOTP}
                        >
                          Verify OTP
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Only show rest of form after OTP verification */}
                  {otpVerified && (
                    <div className="space-y-4 mt-6">
                      <div className="border-t pt-4 my-4">
                        <p className="text-center text-sm font-medium text-green-600 mb-4">
                          Mobile verified successfully! Please complete your registration.
                        </p>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
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
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course/Department</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Computer Science"
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
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
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
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CalendarDays className="h-5 w-5 text-gray-400" />
                              </div>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="1"
                                  className="pl-10"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
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
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound className="h-5 w-5 text-gray-400" />
                              </div>
                              <FormControl>
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="pl-10 pr-10"
                                  {...field}
                                />
                              </FormControl>
                              <div 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
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
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <select
                                className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                {...field}
                              >
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreeToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                I agree to the terms of service and privacy policy
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent text-white py-3 hover:bg-accent/90"
                    disabled={isSubmitting || !otpVerified}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/login" className="text-accent font-medium hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
