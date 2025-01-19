import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

export const sendWelcomeEmail = async (otp, email) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const response = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Hello World',
                html:`<p>Congrats on sending your <strong>first email</strong>!</p>
                    <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
                     <p>Please use this code to complete your verification.</p>`,
        });

        return response; 
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email'); 
    }
};