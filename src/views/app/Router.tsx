import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import ShopMen from "../pages/Shop/Men";
import Home from "../pages/Home";
import ProductInfo from "../pages/Shop/ProductInfo";

const Router = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shop/men" element={<ShopMen />} />
				<Route path="/shop/product/:id" element={<ProductInfo />} />
			</Routes>
		</div>
	);
};

export default Router;
