"use client";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PaymentButton() {
     const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [amount, setAmount] = useState(""); 
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    const amountInRupees = parseFloat(amount);
    if (isNaN(amountInRupees) || amountInRupees <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInRupees , currency: "INR" }),
      });

      const data = await res.json();
      if (!data.id) throw new Error("Payment order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Fittrack",
        description: "Support Payment",
        handler: function (response) {
            toast.success("✅ Payment Successful!");
            localStorage.setItem("paymentSuccess", "true");
            router.push('/Home');
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
     <Toaster/>
        <div className=" flex flex-col items-center justify-center ">    
      <p className="text-stone-500 mb-4">Support FitTrack! Enter an amount and contribute to keep us growing. 🚀</p>
      {/* Input Field for Custom Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
         className=" px-4 py-2 rounded-lg mb-3 text-center bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
      />

      {/* Preset Amount Buttons */}
      <div className="flex justify-center gap-3 mb-10">
        {[10, 30, 50].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="px-2 py-1 border border-stone-500 rounded-lg text-stone-400"
          >
            ₹{amt}
          </button>
        ))}
      </div>
      <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-blue-500 text-white p-2 rounded-lg"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  
  </div>

   </>
  );
}
