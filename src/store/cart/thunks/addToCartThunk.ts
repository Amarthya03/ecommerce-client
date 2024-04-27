import axios from "axios";
import { env } from "../../../environments/environments";

export const addToCartThunk = async (productId: number, userId: string) => {
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "addToCartGraphQl",
		query: `mutation addToCartGraphQl {
						addToCart(
                            productId: ${productId}, 
                            userId: ${userId}
                        ) {
                            cartId,
                            productId,
                            userId
                        }
					}`,
		variables: {},
	};
	const res = await axios({
		url: env.endpoint,
		method: "post",
		headers: headers,
		data: graphqlQuery,
	});

	return res.data.data;
};
