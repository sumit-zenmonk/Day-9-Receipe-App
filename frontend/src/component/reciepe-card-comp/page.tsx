"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import styles from "./RecipeCardList.module.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from "@/redux-store/hooks";
import { RootState } from "@/redux-store";

type Recipe = {
    recipe_uuid: string;
    recipe_name: string;
    images: { uuid: string; img: string }[];
    steps: { uuid: string; steps_string: string }[];
    favoritedBy: { user_uuid: string; is_active: boolean }[];
    description: string;
};

type Props = {
    recipes: Recipe[];
};

export default function RecipeCardList({ recipes }: Props) {
    return (
        <Box className={styles.container}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.recipe_uuid} recipe={recipe} />
            ))}
        </Box>
    );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
    const { access_token, user_id: loggedInUserUuid } = useAppSelector(
        (state: RootState) => state.currentUserReducer
    );
    const [isFav, setIsFav] = useState(
        recipe?.favoritedBy?.some((fav: any) => fav.user_uuid === loggedInUserUuid && fav.is_active === true)
    );

    const handleFav = async (recipeUuid: string) => {
        const previousState = isFav;
        setIsFav(!previousState);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/fav_reciepe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: access_token,
                    },
                    body: JSON.stringify({ recipe_uuid: recipeUuid }),
                }
            );

            if (!res.ok) throw new Error("Failed to update favorite");
        } catch (error) {
            setIsFav(previousState);
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <Card className={styles.card}>
            <Box className={styles.imageWrapper}>
                {recipe.images && recipe.images.length > 0 && (
                    <Image
                        src={recipe.images[0].img}
                        alt={recipe.recipe_name}
                        width={500}
                        height={300}
                        className={styles.image}
                    />
                )}
            </Box>

            <CardContent className={styles.content}>
                <Typography variant="h3" className={styles.title}>
                    {recipe.recipe_name}
                </Typography>
                <Typography variant="h6" className={styles.description}>
                    {recipe.description}
                </Typography>

                <Box className={styles.steps}>
                    {recipe.steps?.slice(0, 4).map((step) => (
                        <Typography key={step.uuid} variant="body2">
                            • {step.steps_string}
                        </Typography>
                    ))}
                </Box>
            </CardContent>

            <Box className={styles.cardFooter}>
                <Button onClick={() => handleFav(recipe.recipe_uuid)} sx={{ minWidth: "auto" }}>
                    {isFav ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </Button>
            </Box>
        </Card>
    );
}
