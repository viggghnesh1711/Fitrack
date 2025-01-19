import connectMongo from "@/lib/dbConnect";
import User from "@/app/models/user";

export async function savegoogleuser({ email, googleId }) {
  await connectMongo();
  const existingGoogleUser = await User.findOne({ googleId });
  const emailUser = await User.findOne({ email });

  if (!existingGoogleUser) {
    if (!emailUser) {
      // Case 1: New Google user, create a new account
      const newUser = new User({ email, googleId });
      console.log("New User created:", newUser);
      await newUser.save();
      return { status: "new_user", redirectTo: "/User-Details" }; // Redirect to User-Details for new users
    } 
    else {
      // Case 2: Existing email user without Google linked, update the Google ID
      const updatedUser = await User.findOneAndUpdate(
        { email: emailUser.email },
        { googleId: googleId },
        { new: true }
      );
      console.log("User updated with Google ID:", updatedUser);
      return { status: "updated_user", redirectTo: "/Home" }; // Redirect to Dashboard after linking
    }
  } else {
    // Case 3: Existing Google user, no action needed
    console.log("Existing user:", existingGoogleUser);
    return { status: "existing_user", redirectTo: "/Home" }; // Redirect to Dashboard for existing users
  }
}

