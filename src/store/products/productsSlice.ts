import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsGraphQl } from "./thunks/getProductsThunk";
import { Product } from "../../shared/types/Product";
import { RootState } from "../rootStore";
import { getProductByIdGraphQl } from "./thunks/getProductByIdThunk";

export interface ProductsState {
	products: Product[];
	productById: Product | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}

const initialState: ProductsState = {
	products: [],
	productById: null,
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

export const getProductById = createAsyncThunk(
	"products/getProductById",
	async (id: Number) => {
		const response = await getProductByIdGraphQl(id);
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
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.productById = action.payload;
			});
	},
});

export const getAllProducts = (state: RootState) => state.products.products;
export const getProductsStatus = (state: RootState) => state.products.loading;
export const getProductsError = (state: RootState) => state.products.error;

export default productsSlice.reducer;
