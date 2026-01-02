import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            async authorize(credentials) {
                // TEMP user (replace with DB later)
                if (
                    credentials.email === "test@gmail.com" &&
                    credentials.password === "123456"
                ) {
                    return {
                        id: "1",
                        email: credentials.email,
                    };
                }

                return null; // login failed
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
