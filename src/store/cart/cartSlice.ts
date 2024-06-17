import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/shared/types/Cart";
import { getCartThunk } from "./thunks/getCartThunk";
import { addToCartThunk } from "./thunks/addToCartThunk";

export interface CartState {
	cart: Cart[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}

const initialState: CartState = {
	cart: [],
	loading: "idle",
	error: undefined,
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
	const response = await getCartThunk();
	return response;
});

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ productId, userId }: { productId: number; userId: string }) => {
		const response = await addToCartThunk(productId, userId);
		return response;
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCart.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.cart = action.payload;
			})
			.addCase(getCart.pending, (state, action) => {
				state.loading = "pending";
			})
			.addCase(getCart.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message;
			});
	},
});
