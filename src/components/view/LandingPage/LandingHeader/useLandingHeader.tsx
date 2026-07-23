import { useSession } from "next-auth/react";

const useLandingHeader = () => {
	const { data: session, status } = useSession();

	const dashboardUrl =
		session?.user?.role?.name === "SUPER_ADMIN"
			? "/admin/dashboard"
			: "/user/dashboard";

	return {
		isLoading: status === "loading",
		isAuthenticated: !!session,
		user: session?.user,
		dashboardUrl,
	};
};

export default useLandingHeader;