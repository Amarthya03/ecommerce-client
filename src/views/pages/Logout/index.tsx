import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem, Typography } from "@mui/material";
import React from "react";

const LogoutButton = () => {
	const { logout } = useAuth0();

	// return <button onClick={() => loginWithRedirect()}>Log In</button>;
	return (
		<MenuItem onClick={() => logout()}>
			<Typography textAlign="center">Logout</Typography>
		</MenuItem>
	);
};

export default LogoutButton;
