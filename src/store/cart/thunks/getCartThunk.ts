import axios from "axios";
import { env } from "@/environments/environments";

export const getCartThunk = async () => {
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "getCartGraphQl",
		query: `query getCartGraphQl {
						cart {
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

	return res.data.data.cart;
};
