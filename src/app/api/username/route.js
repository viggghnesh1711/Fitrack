// pages/api/username.js
import connectMongo from "@/lib/dbConnect";
import User from "@/app/models/user"
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    await connectMongo();

    const userEmailCookie = cookieStore.get('userEmail');
    if (!userEmailCookie) {
      return new Response(JSON.stringify({ message: "No userEmail cookie found" }), { status: 400 });
    }

    const user = await User.findOne({ email: userEmailCookie.value });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ username: user.username,weight:user.weight,
      height:user.height,goal:user.typebody }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
