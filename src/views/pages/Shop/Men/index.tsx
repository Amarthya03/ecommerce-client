import { ChangeEvent, Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProducts,
	getProductsPageCount,
	getProductsPaginationItems,
	getProductsStatus,
	setPageNumber,
	setPaginationItems,
} from "@/store/products/productsSlice";
import LoaderComponent from "@/shared/components/LoaderComponent/LoaderComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container, Grid, Pagination, PaginationItem } from "@mui/material";
import ProductsFilterComponent from "./ProductsFilterComponent";

const ProductsList = lazy(() => import("./ProductsList"));

const ShopMen = () => {
	const dispatch = useDispatch();
	const productsStatus = useSelector(getProductsStatus);
	const pageCount = useSelector(getProductsPageCount);
	const paginationItems = useSelector(getProductsPaginationItems);

	useEffect(() => {
		if (productsStatus === "idle") dispatch(getProducts());
	}, [productsStatus, dispatch]);

	const handleChange = (event: ChangeEvent<unknown>, value: number) => {
		dispatch(setPageNumber(value));
		dispatch(setPaginationItems(value));
	};

	return (
		<Container>
			<Grid
				container
				spacing={2}
				style={{
					marginTop: "2%",
					marginBottom: "2%",
					display: "flex",
					flexDirection: "row-reverse",
				}}
			>
				<ProductsFilterComponent />
			</Grid>
			<Grid container spacing={2}>
				<Suspense fallback={<LoaderComponent />}>
					<ProductsList paginationItems={paginationItems} />
				</Suspense>
			</Grid>
			<Pagination
				count={pageCount}
				size="large"
				siblingCount={2}
				boundaryCount={2}
				onChange={handleChange}
				renderItem={(item) => (
					<PaginationItem
						slots={{
							previous: ArrowBackIcon,
							next: ArrowForwardIcon,
						}}
						{...item}
					/>
				)}
			/>
		</Container>
	);
};

export default ShopMen;
