import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsGraphQl } from "./thunks/getProductsThunk";
import { Product } from "@/shared/types/Product";
import { RootState } from "@/store/rootStore";
import { getProductByIdGraphQl } from "./thunks/getProductByIdThunk";

export interface ProductsState {
	products: Product[];
	productById: Product | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
	pageNumber: number;
	pageCount: number;
	paginationItems: Product[];
	sortBy: "" | "discount" | "rating" | "high_to_low" | "low_to_high";
	error: string | undefined;
}

const initialState: ProductsState = {
	products: [],
	productById: null,
	loading: "idle",
	pageNumber: 1,
	pageCount: 0,
	paginationItems: [],
	sortBy: "",
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
	reducers: {
		setPaginationItems: (state, action) => {
			const start = action.payload * 50 - 50;
			const end = action.payload * 50;
			state.paginationItems = state.products.slice(start, end);
		},
		sortItemsBy: (state, action) => {
			state.sortBy = action.payload;
			if (state.loading === "succeeded") {
				switch (action.payload) {
					case "discount": {
						state.pageNumber = 1;
						state.products = state.products.sort(
							(a, b) => b.discount - a.discount
						);
						state.paginationItems = state.products.slice(0, 50);
						break;
					}
					case "high_to_low": {
						state.pageNumber = 1;
						state.products = state.products.sort(
							(a, b) => b.price - a.price
						);
						state.paginationItems = state.products.slice(0, 50);
						break;
					}
					case "low_to_high": {
						state.pageNumber = 1;
						state.products = state.products.sort(
							(a, b) => a.price - b.price
						);
						state.paginationItems = state.products.slice(0, 50);

						break;
					}
					case "rating": {
						state.pageNumber = 1;
						state.products = state.products.sort(
							(a, b) => b.rating - a.rating
						);
						state.paginationItems = state.products.slice(0, 50);

						break;
					}
					default: {
						break;
					}
				}
			}
		},
		setPageNumber: (state, action) => {
			state.pageNumber = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.products = action.payload;
				state.pageCount = action.payload.length / 50;
				state.paginationItems = action.payload.slice(0, 50);
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
export const getProductsPageCount = (state: RootState) =>
	state.products.pageCount;
export const getProductsPaginationItems = (state: RootState) =>
	state.products.paginationItems;
export const getProductsSortedBy = (state: RootState) => state.products.sortBy;
export const getPageNumber = (state: RootState) => state.products.pageNumber;

export const { setPaginationItems, sortItemsBy, setPageNumber } =
	productsSlice.actions;

export default productsSlice.reducer;
