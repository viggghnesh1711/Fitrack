import Exc from "@/app/models/excersise";
import User from "@/app/models/user";
import connectMongo from "@/lib/dbConnect";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectMongo(); // Ensure MongoDB connection

    const form = await request.json();
    const cookieStore = cookies();
    const userEmailCookie = cookieStore.get("userEmail");

    if (!userEmailCookie) {
      return new Response(
        JSON.stringify({ message: "No userEmail cookie found", stat: false }),
        { status: 400 }
      );
    }

    if (userEmailCookie.value !== form.email) {
      return new Response(
        JSON.stringify({ message: "Invalid email address", stat: false }),
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findOne({ email: userEmailCookie.value });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", stat: false }),
        { status: 404 }
      );
    }

    // Delete exercises associated with the user
    await Exc.deleteMany({ _id: { $in: user.exercises } });

    // Delete the user account
    await User.deleteOne({ _id: user._id });

    return new Response(
      JSON.stringify({ message: "User deleted successfully", stat: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", stat: false }),
      { status: 500 }
    );
  }
}
