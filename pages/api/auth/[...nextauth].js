import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: {
          label: "Usuario",
          type: "text",
          placeholder: "Nombre de Usuario",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        const url = `${process.env.API_URL}login`;

        const response = await axios.post(
          url,
          {
            username: credentials.username,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "accept-Language": credentials.locale
            }
          }
        );

        if (response.status == 200) {
          // expire in 30 days

          const user = {
            id: response.data.user_id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            photo: response.data.photo,
            token: response.data.token,
            token_type: response.data.token_type,
            locale: credentials.locale,
          };

          if (user) {
            // return user
            return Promise.resolve(user);
          } else {
            // return null
            return Promise.resolve(null);
          }
        } 
        
        return Promise.resolve();
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }
      return token;
    },
    session: (seshProps) => {
      return seshProps.token;
    },
  },
  secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
});
