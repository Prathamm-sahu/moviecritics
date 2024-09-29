import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";
import { nanoid } from "nanoid";
import crypto from "crypto"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-in"
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "xyz@xyz.com"},
        password: { label: "Password", type: "password", placeholder: "Your super secret password"}
      },
      async authorize(credentials: any) {
        const email = credentials.email;
        const password = credentials.password;

        let hashedPassword;
        crypto.pbkdf2(password, "salt1", 100000, 128, "sha512", (err, hashedPassword) => {
          hashedPassword = hashedPassword
        })

        const user = await db.user.findFirst({
          where: {
            email,
            // Check for password
          }
        })

        if(!user) {
          return {
            id: "",
            email: email

          }
        }


        return {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
          username: user.username
        }
      }
    })
  ],
  callbacks: {
    async session({session, token}) {
      if(token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }
      return session
    },
    async jwt({token, user}) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        }
      })
      if(!dbUser) {
        token.id = user!.id
        return token
      }

      if(!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id
          },
          data: {
            username: nanoid(10)
          }
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    redirect() {
      return '/'
    }
  }
}

export const getAuthSession = () => getServerSession(authOptions)