import { cookies } from "next/headers";
import Razorpay from "razorpay";
import { Resend } from "resend";

export async function POST(req) {
    const cookieStore = cookies();
    const userEmailCookie = cookieStore.get("userEmail");
  const { amount, currency } = await req.json(); // Get amount from frontend
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Convert to paise (smallest unit)
      currency: currency || "INR",
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    await resend.emails.send({
        from: "no-reply@fittrack.fun", // Must be a verified email on Resend
        to: userEmailCookie.value, // User email from frontend
        subject: "Thank You for Your Support!",
        html: `
          <div style="
            max-width: 500px;
            margin: auto;
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          ">
            <h2 style="color: #e6b753; font-size: 24px;">🎉 Thank You for Supporting FitTrack! 🎉</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5;">
              Your generous contribution helps us improve and grow.  
              We truly appreciate your support in making FitTrack better for everyone!  
            </p>
      
            <div style="margin: 20px 0;">
              <img src="https://fittrack.fun/logo.png" alt="FitTrack Logo" style="width: 80px; border-radius: 50%;" />
            </div>
      
            <p style="color: #555; font-size: 14px;">
              Stay fit and keep tracking your progress! 🚀  
            </p>
      
            <a href="https://fittrack.fun" style="
              display: inline-block;
              margin-top: 15px;
              padding: 10px 20px;
              background: #e6b753;
              color: #fff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
              transition: 0.3s ease;
            ">Explore More</a>
          </div>
        `,
      });
      

    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
