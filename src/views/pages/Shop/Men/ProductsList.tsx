import React from "react";
import { Product } from "../../../../shared/types/Product";
import { Grid } from "@mui/material";
import CardComponent from "../../../../shared/components/CardComponent/CardComponent";

interface Props {
	paginationItems: Product[];
}

const ProductsList = ({ paginationItems }: Props) => {
	return (
		<>
			{paginationItems.map((el) => (
				<Grid key={el.id} item xs={3}>
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
			))}
		</>
	);
};

export default ProductsList;
