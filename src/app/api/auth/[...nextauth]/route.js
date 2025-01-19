
import { savegoogleuser } from "@/utils/savegoogleuser";
import { creatingcookie } from "@/utils/creatingcookie";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const { email, sub: googleId } = profile;

      // Call savegoogleuser to handle user logic
      const result = await savegoogleuser({ email, googleId });

      if (result.status === "existing_user" || result.status === "updated_user" || result.status === "new_user" ) {
        // Create a session cookie for the user
        await creatingcookie({ email });
      }

      // Redirect based on the result
      return Promise.resolve(result.redirectTo);
    },
    async redirect({ url, baseUrl }) {
      // Use the URL returned by the signIn callback
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

