"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import styles from "./RecipeCardList.module.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from "@/redux-store/hooks";
import { RootState } from "@/redux-store";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ApiCallService } from "@/services/http";

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
    const router = useRouter();
    const { access_token, user_id: loggedInUserUuid } = useAppSelector(
        (state: RootState) => state.currentUserReducer
    );
    const [isFav, setIsFav] = useState(
        recipe?.favoritedBy?.some((fav: any) => fav.user_uuid === loggedInUserUuid && fav.is_active === true)
    );

    const handleDelete = async (recipeUuid: string) => {
        if (!access_token) {
            router.push(`/login`)
            return;
        }

        try {
            const response = await ApiCallService(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/reciepe/${recipeUuid}`,
                "DELETE",
                { Authorization: access_token },
                JSON.stringify({ recipe_uuid: recipeUuid })
            );

            if (response?.message == "Deleted Success") {
                enqueueSnackbar(response.message, { variant: "success" });
            } else {
                enqueueSnackbar(response.message || "Delete Event Failed", { variant: "error" });
            }
        } catch (error: any) {
            console.log("catch", error);
            enqueueSnackbar(error?.message || "Delete failed", { variant: "error" });
        }
    };

    const handleFav = async (recipeUuid: string) => {
        if (!access_token) {
            router.push(`/login`)
            return;
        }
        const previousState = isFav;
        setIsFav(!previousState);

        try {
            const response = await ApiCallService(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/fav_reciepe`,
                "POST",
                {
                    Authorization: access_token,
                },
                JSON.stringify({ recipe_uuid: recipeUuid })
            );
            if (response?.user_receiepes) {
                enqueueSnackbar(
                    `${!previousState ? "Added to" : "Removed from"} favorite recipe`,
                    { variant: !previousState ? "success" : "info" }
                );
            } else {
                enqueueSnackbar(response.message || "Favorite Add Event Failed", { variant: "error" });
                throw new Error("Failed to update favorite");
            }
        } catch (error: any) {
            setIsFav(previousState);
            enqueueSnackbar(error?.message || "Favorite update failed", {
                variant: "error",
            });
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

            <CardContent className={styles.content} onClick={() => { router.push(`/reciepe/${recipe.recipe_uuid}`) }}>
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
                <Button onClick={() => { handleDelete(recipe.recipe_uuid) }}>
                    <DeleteForeverIcon />
                </Button>
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
