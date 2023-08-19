import axios from "axios";

export const getProductsGraphQl = async () => {
	const endpoint = "http://localhost:4200";
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "Query",
		query: `query Query {
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
		url: endpoint,
		method: "post",
		headers: headers,
		data: graphqlQuery,
	});

	return res.data.data.products;
};
