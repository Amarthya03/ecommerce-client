import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	SelectProps,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductsSortedBy,
	sortItemsBy,
} from "../../../../store/products/productsSlice";

const ProductsFilterComponent = () => {
	const dispatch = useDispatch();
	const sortByOption = useSelector(getProductsSortedBy);

	const sortByOptions = [
		{ key: "discount", value: "Discount" },
		{ key: "high_to_low", value: "Price: High to Low" },
		{ key: "low_to_high", value: "Price: Low to High" },
		{ key: "rating", value: "Rating" },
	];

	const handleSortByChange = (evt: SelectChangeEvent<string>) => {
		dispatch(sortItemsBy(evt.target.value));
	};

	return (
		<Box sx={{ minWidth: 300 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Sort by</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={sortByOption}
					label="Discount"
					onChange={(evt: SelectChangeEvent<string>) =>
						handleSortByChange(evt)
					}
				>
					{sortByOptions.map((option, index) => (
						<MenuItem value={option.key} key={index}>
							{option.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default ProductsFilterComponent;
