import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from "@supabase/supabase-js"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        try {
          await supabase.from("users").upsert(
            { email: user.email.toLowerCase() },
            { onConflict: "email", ignoreDuplicates: true }
          )
        } catch (err) {
          console.error("Failed to upsert user:", err)
        }
      }
      return true
    },
    async session({ session, token }) {
      return session
    },
  },
})