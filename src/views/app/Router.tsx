import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../shared/components/Navbar";

const Router = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<>hello</>} />
			</Routes>
		</div>
	);
};

export default Router;
