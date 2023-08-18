import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { getProductsGraphQl } from "./thunks/getProductsThunk";
import { Product } from "../../shared/types/Product";
import { RootState } from "../rootStore";

export interface ProductsState {
	products: Product[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}

const initialState: ProductsState = {
	products: [],
	loading: "idle",
	error: undefined,
};

export const getProducts: any = createAsyncThunk(
	"products/getProducts",
	async () => {
		const response = await getProductsGraphQl();
		return response;
	}
);

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.products = action.payload;
			})
			.addCase(getProducts.pending, (state, action) => {
				state.loading = "pending";
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message;
			});
	},
});

export const getAllProducts = (state: RootState) => state.products.products;
export const getProductsStatus = (state: RootState) => state.products.loading;
export const getProductsError = (state: RootState) => state.products.error;

export default productsSlice.reducer;
