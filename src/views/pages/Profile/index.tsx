import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isAuthenticated) {
		console.log(user);
	}

	return <div>Profile</div>;
};

export default Profile;
