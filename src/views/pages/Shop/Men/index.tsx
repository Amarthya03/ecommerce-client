import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProducts,
	getProducts,
	getProductsError,
	getProductsStatus,
} from "../../../../store/products/productsSlice";
import CardComponent from "../../../../shared/components/CardComponent/CardComponent";
import LoaderComponent from "../../../../shared/components/LoaderComponent/LoaderComponent";
import { Container, Grid } from "@mui/material";

const ShopMen = () => {
	const dispatch = useDispatch();
	const products = useSelector(getAllProducts);
	const productsStatus = useSelector(getProductsStatus);
	const productsError = useSelector(getProductsError);

	useEffect(() => {
		if (productsStatus === "idle") dispatch(getProducts());
	}, [productsStatus, dispatch]);

	return (
		<Container>
			<Grid container spacing={2}>
				{productsStatus === "succeeded" ? (
					products.map((el) => (
						<Grid item xs={3}>
							<CardComponent
								brand={el.brand}
								discount={el.discount}
								image={el.image}
								name={el.name}
								price={el.price}
								rating={el.rating}
								id={el.id}
							/>
						</Grid>
					))
				) : (
					<LoaderComponent />
				)}
			</Grid>
		</Container>
	);
};

export default ShopMen;
