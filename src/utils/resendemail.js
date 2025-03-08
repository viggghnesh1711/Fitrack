import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

export const sendWelcomeEmail = async (otp, email) => {
    try {
        console.log("checking one",email)
        const resend = new Resend(process.env.RESEND_API_KEY);
        const response = await resend.emails.send({
                from: 'no-reply@fittrack.fun',
                to: email,
                subject: 'fittrack verification',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; text-align: center; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #333; margin-bottom: 10px;">Your Verification Code</h2>
                  <p style="font-size: 16px; color: #555;">Use the OTP below to complete your verification:</p>
                  
                  <div style="font-size: 22px; font-weight: bold; color: #2c3e50; background: #f4f4f4; padding: 12px; border-radius: 8px; display: inline-block; margin: 10px 0; letter-spacing: 2px;" id="otp-code">
                    ${otp}
                  </div>
                  
                
              
                  <p style="font-size: 14px; color: #555; margin-top: 15px;">
                    This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.
                  </p>
                  <p style="font-size: 14px; color: #777;">
                    If you didn't request this, you can ignore this email.
                  </p>
              
                  <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                  <p style="font-size: 12px; color: #999;">
                    &copy; 2025 FitTrack. All rights reserved.
                  </p>
              
                  <script>
                    function copyOTP() {
                      navigator.clipboard.writeText("${otp}").then(() => {
                        alert("OTP copied to clipboard!");
                      }).catch(err => {
                        console.error("Error copying OTP:", err);
                      });
                    }
                  </script>
                </div>
              `
        });

        return response; 
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email'); 
    }
};