import axios from "axios";
import { env } from "@/environments/environments";

export const getProductsGraphQl = async () => {
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "getProductsGraphQl",
		query: `query getProductsGraphQl {
						products {
							id
							name
							price
							discount
							brand
							image
							info
							color
							rating
							category
							sizes
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

	return res.data.data.products;
};
