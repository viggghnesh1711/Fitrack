"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Delete = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    try {
      const response = await fetch("/api/deleteuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok && data.stat) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/Sign-In");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Toaster />
      <div className="bg-stone-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold text-white text-center mb-4">
          Confirm Account Deletion
        </h2>
        <p className="text-stone-400 text-sm text-center mb-4">
          Are you sure you want to delete your account? This action is
          <span className="text-red-500 font-bold"> irreversible.</span>
        </p>

        <form onSubmit={handleDeleteAccount} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-stone-300">
              Confirm Your Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email..."
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-white border border-stone-600 focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-stone-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg w-full text-white font-medium transition-all"
          >
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delete;
