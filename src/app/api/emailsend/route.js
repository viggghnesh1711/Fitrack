import connectMongo from "@/lib/dbConnect";
import User from "@/app/models/user";
import UserVerfication from "@/app/models/userVerification";
import { sendWelcomeEmail } from "@/utils/resendemail";

export async function POST(request){
    try{
        const form = await request.json()
        await connectMongo()

        const usercheck = await User.findOne({email:form.email})
        if(usercheck){
            console.log("user already exist")
            return new Response(JSON.stringify({message:"User already exists",stat:false}),{
                status:200
            })
        }
        else{
            const ans = await UserVerfication.deleteMany({ email: form.email });
            console.log(ans)

            const generateOTP = () => {
                const otp = Math.floor(100000 + Math.random() * 900000);
                return otp.toString(); 
            };
            const otp = generateOTP();
    
            const user = await UserVerfication.create({
                email:form.email,
                password:form.password,
                verificationcode:otp
            })
            console.log("user created",user.verificationcode)
            console.log("otp",otp)
            const response = await sendWelcomeEmail(otp,form.email);
            
            return new Response(JSON.stringify({message:"Code Sent Succesfully",stat:true}),{
                status:200
            })
        }
    }
    catch(error){
        console.log("error",error)
        return new Response(JSON.stringify({message:"Something went wrong...."}),{
            status:500
        })
    }
}