import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../shared/components/Navbar/Navbar";
import ShopMen from "../pages/Shop/Men";
import Home from "../pages/Home";

const Router = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shop/men" element={<ShopMen />} />
			</Routes>
		</div>
	);
};

export default Router;
