import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProducts,
	getProducts,
	getProductsError,
	getProductsStatus,
} from "../../../../store/products/productsSlice";

const ShopMen = () => {
	const dispatch = useDispatch();
	const products = useSelector(getAllProducts);
	const productsStatus = useSelector(getProductsStatus);
	const productsError = useSelector(getProductsError);

	useEffect(() => {
		if (productsStatus === "idle") dispatch(getProducts());
	}, [productsStatus, dispatch]);

	return (
		<div>
			{productsStatus === "succeeded"
				? products.map((el) => (
						<div key={el.id.toString()}>1 {el.brand}</div>
				  ))
				: "loading"}
		</div>
	);
};

export default ShopMen;
