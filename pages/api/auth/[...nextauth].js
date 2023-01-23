import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const isCorrectCredentials = credentials =>
  credentials.username === process.env.NEXTAUTH_USERNAME &&
  credentials.password === process.env.NEXTAUTH_PASSWORD

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        username: {
          label: 'Usuario',
          type: 'text',
          placeholder: 'Nombre de Usuario',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: "Contraseña"
        },
      },
      async authorize(credentials) {
        if (isCorrectCredentials(credentials)) {

          const user = { id: 26, name: "jhon lennon", email: "lennon@example.com", jwt: "Bearer u234ssdas.sdasdas-adsadas,asdasda", locale: credentials.locale}

          if (user) {
            // return user
            return Promise.resolve(user)
          } else {
            // return null
            return Promise.resolve(null)
          }          
        }
        // return null;
        return Promise.resolve(null)
      },
    }),
  ],  
  // theme: {
  //   colorScheme: "light",
  // },
  pages: {
    signIn: '/login',
//    signOut: '/signout',
  },  

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }
      return token
    },
    session: (seshProps) => {
      return seshProps.token;
    },
  },
  secret: 'my-secret',
  jwt: {
    secret: 'my-secret',
    maxAge: 60 * 60 * 24 * 30,
  }
});

// export default NextAuth(options)
