"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "./RecipeCardList.module.css";

type Recipe = {
    recipe_uuid: string;
    recipe_name: string;
    images: { uuid: string; img: string }[];
    steps: { uuid: string; steps_string: string }[];
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
    return (
        <Card className={styles.card}>
            {recipe.images.length > 0 && (
                <Box className={styles.imageWrapper}>
                    <Image
                        src={recipe.images[0].img}
                        alt={recipe.recipe_name}
                        width={500}
                        height={300}
                        className={styles.image}
                    />
                </Box>
            )}

            <CardContent className={styles.content}>
                <Typography variant="h6" className={styles.title}>
                    {recipe.recipe_name}
                </Typography>

                <Box className={styles.steps}>
                    {recipe.steps.slice(0, 4).map((step) => (
                        <Typography key={step.uuid} variant="body2">
                            • {step.steps_string}
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}