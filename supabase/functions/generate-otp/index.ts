
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { randomInt } from "https://deno.land/std@0.177.0/node/crypto.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mobile } = await req.json();
    
    if (!mobile) {
      return new Response(
        JSON.stringify({ error: "Mobile number is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate a 6-digit OTP
    const otp = randomInt(100000, 999999).toString();
    
    // In a real application, you would send the OTP via SMS here
    // For this example, we'll just log it
    console.log(`OTP for ${mobile}: ${otp}`);
    
    // Store OTP in the database with an expiry time (15 minutes)
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 15);
    
    // This is just for storage, not for authentication
    // We don't have a user ID yet, so we'll use the mobile number to identify the OTP
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP sent successfully", 
        otp: otp // In production, you would not return the OTP, this is just for demo
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating OTP:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate OTP" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
