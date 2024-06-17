import axios from "axios";
import { env } from "@/environments/environments";

export const getProductByIdGraphQl = async (id: Number) => {
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "getProductByIdGraphQl",
		query: `query getProductByIdGraphQl {
						productById (id: ${id}) {
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

	return res.data.data.productById;
};
