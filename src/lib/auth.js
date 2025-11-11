import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				token.provider = account.provider;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.provider = token.provider;
			}
			return session;
		},
	},
	secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
};

export const { auth } = NextAuth(authOptions);


