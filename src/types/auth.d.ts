import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

interface ILogin {
	email: string;
	password: string;
}

interface IRegister {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

interface IActivation {
	activationCode: string;
}

declare module "next-auth" {
	interface User extends DefaultUser {
		id: string;
		role?: string;
		accessToken?: string;
	}

	interface Session extends DefaultSession {
		user: User;
		accessToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user?: User;
	}
}

export { ILogin, IRegister, IActivation };
