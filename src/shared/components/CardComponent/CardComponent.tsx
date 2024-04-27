import React, { Suspense, lazy } from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PriceComponent from "./PriceComponent/PriceComponent";
import { Link } from "react-router-dom";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

const CardMedia = lazy(() => import("@mui/material/CardMedia"));

interface Props {
	id: number;
	name: string;
	price: number;
	discount: number | undefined;
	brand: string;
	image: string;
	rating: number;
}

export default function CardComponent({
	id,
	name,
	price,
	discount,
	brand,
	image,
	rating,
}: Props) {
	const handleWishlistClick = () => {
		console.log(`${id} clicked`);
	};

	return (
		<Card sx={{ height: 450 }} key={id}>
			<Suspense fallback={<LoaderComponent />}>
				<CardMedia
					component="img"
					height="194"
					image={image}
					alt="Paella dish"
				/>
			</Suspense>
			<CardContent>
				<Typography variant="body1">{brand}</Typography>
				<Typography variant="body2" color="text.secondary">
					<Link to={`/shop/product/${id}`}>{name}</Link>
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{discount ? (
						<PriceComponent price={price} discount={discount} />
					) : (
						`₹ ${price}/-`
					)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{rating}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					onClick={handleWishlistClick}
					aria-label="add to favorites"
					color="error"
				>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
