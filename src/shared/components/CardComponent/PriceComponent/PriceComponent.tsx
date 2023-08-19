import React from "react";
import "./styles.scss";

interface Props {
	price: number;
	discount: number;
}

const PriceComponent = ({ price, discount }: Props) => {
	return (
		<span>
			₹ {price - discount}/-{" "}
			<span className="kActualPrice">₹ {price}/-</span>{" "}
			<span className="kDiscount">({discount}% off)</span>
		</span>
	);
};

export default PriceComponent;
