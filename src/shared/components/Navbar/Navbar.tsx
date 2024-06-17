import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NavbarLogo from "./components/NavbarLogo";
import SearchbarComponent from "./components/SearchbarComponent/SearchbarComponent";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LoginButton from "@/views/pages/Logout";
import LogoutButton from "@/views/pages/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const pages = ["Men", "Women", "Kids", "Home and Living", "Beauty", "Studio"];
const settings = ["Orders", "Edit Profile"];

function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<AppBar
			position="static"
			style={{
				margin: 0,
				padding: 0,
			}}
			color="default"
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<NavbarLogo display={{ xs: "none", md: "flex" }} />

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
								>
									<NavLink to="/shop/men">
										<Typography textAlign="center">
											{page}
										</Typography>
									</NavLink>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<NavbarLogo display={{ xs: "flex", md: "none" }} />
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								sx={{
									my: 2,
									display: "block",
									color: "black",
									fontWeight: "bold",
									fontSize: "90%",
								}}
							>
								<NavLink
									to={`/shop/${page
										.replaceAll(" ", "_")
										.toLowerCase()}`}
								>
									{page}
								</NavLink>
							</Button>
						))}
					</Box>

					<SearchbarComponent />

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Profile">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 2 }}
							>
								<PermIdentityOutlinedIcon />
							</IconButton>
						</Tooltip>

						<Tooltip title="Wishlist">
							<IconButton
								// onClick={handleOpenUserMenu}
								sx={{ p: 2 }}
							>
								<FavoriteBorderOutlinedIcon />
							</IconButton>
						</Tooltip>

						<Tooltip title="Cart">
							<IconButton
								// onClick={handleOpenUserMenu}
								sx={{ p: 2 }}
							>
								<ShoppingBagOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{isAuthenticated && (
								<MenuItem>
									<Typography>
										Hi {user?.given_name}
									</Typography>
								</MenuItem>
							)}
							{isAuthenticated &&
								settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}
									>
										<NavLink
											to={`/${setting
												.replaceAll(" ", "_")
												.toLowerCase()}`}
										>
											<Typography textAlign="center">
												{setting}
											</Typography>
										</NavLink>
									</MenuItem>
								))}
							{isAuthenticated ? (
								<LogoutButton />
							) : (
								<LoginButton />
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
