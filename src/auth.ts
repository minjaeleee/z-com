import NextAuth from "next-auth"
import { cookies } from 'next/headers'
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from 'cookie';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',    
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })

        // 백엔드 쿠키를 브라우저에 심는 부분
        let setCookie = authResponse.headers.get('Set-Cookie');
        if (setCookie) {
          const parsed = cookie.parse(setCookie)
          cookies().set('connect.sid', parsed['connect.sid'], parsed)
        } 

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()

        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ]
});