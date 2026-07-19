import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import authServices from "@/services/auth.service";
import environment from "@/config/environment";

const handler = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24,
	},

	secret: environment.SECRET,

	providers: [
		CredentialsProvider({
			name: "credentials",

			credentials: {
				email: {},
				password: {},
			},

			async authorize(credentials) {
				if (!credentials) return null;

				try {
					const result = await authServices.login({
						email: credentials.email as string,
						password: credentials.password as string,
					});
					const { token, user } = result.data.data;

					return {
						...user,
						accessToken: token,
					};
				} catch (err) {
					console.error(err);
					return null;
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}

			return token;
		},

		async session({ session, token }) {
			if (token.user) {
				session.user = token.user;
				session.accessToken = token.user.accessToken;
			}

			return session;
		},
	},
});

export { handler as GET, handler as POST };
