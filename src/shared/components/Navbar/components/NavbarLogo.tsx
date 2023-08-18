import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../../assets/images/myntraLogo.png";
import { Container } from "@mui/material";

interface Props {
	display: any;
}

const NavbarLogo = ({ display }: Props) => {
	return (
		<NavLink to={"/"}>
			<Container sx={{ display: display, mr: 1 }}>
				<img
					style={{
						height: "30px",
						padding: "0 30px 0 30px",
					}}
					className="navbarLogo"
					src={image}
					alt="MyntraLogo"
				/>
			</Container>
		</NavLink>
	);
};

export default NavbarLogo;
