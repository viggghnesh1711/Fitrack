import User from "@/app/models/user";
import Exc from "@/app/models/excersise";
import connectMongo from "@/lib/dbConnect";
import { cookies } from 'next/headers'

export async function GET(request){

    try{

        const cookieStore = await cookies()
        await connectMongo()

        const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split("T")[0]; // Get date in "YYYY-MM-DD" format
          };

        const userEmailCookie = cookieStore.get('userEmail');
        const user = await User.findOne({email:userEmailCookie.value}).populate('exercises');

        const chartData = [];
        for (const exercise of user.exercises) {
            const exerciseDate = formatDate(exercise.createdAt); // Get the date of the exercise
      
            // Calculate total weight lifted for the exercise by summing weight * reps for each set
            const totalWeight = exercise.sets.reduce((total, set) => {
              return total + set.weight * set.reps; // Calculate total weight lifted for the set
            }, 0);
      
            // Check if the date already exists in the chartData array
            const existingDateIndex = chartData.findIndex(data => data.date === exerciseDate);
      
            if (existingDateIndex !== -1) {
              // If the date exists, add the total weight to the existing entry for that date
              chartData[existingDateIndex].mobile += totalWeight;
            } else {
              // If the date does not exist, create a new entry for that date
              chartData.push({
                date: exerciseDate,
                mobile: totalWeight, // Total weight lifted on this day
              });
            }
          }

          chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log("data is working here ")

          return new Response(JSON.stringify({message:"Data Fetched",chartData},{
            status:500
        }))
    }
    catch(error){
        return new Response(JSON.stringify({message:"something went wrong"},{
            status:500
        }))
    }
}