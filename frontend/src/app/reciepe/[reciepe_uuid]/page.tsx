'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import { enqueueSnackbar } from "notistack";
import { ApiCallService } from "@/services/http";
import styles from './recipe.module.css';
import Image from 'next/image';

export default function RecipeClientPage() {
    const params = useParams();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiCallService(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/search_reciepe/id/${params.reciepe_uuid}`,
                    "GET"
                );

                if (response && response.data) {
                    enqueueSnackbar("Success", { variant: "success" });
                    setRecipe(response.data);
                } else {
                    const errorMsg = response?.message || "Failed to fetch recipe";
                    enqueueSnackbar(errorMsg, { variant: "error" });
                }
            } catch (error: any) {
                enqueueSnackbar(error?.message || "Something went wrong", {
                    variant: "error",
                });
            }
        };

        fetchData();
    }, []);

    if (!recipe) return (
        <Box className={styles.scrollContainer} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box className={styles.scrollContainer}>
            <Box component="header" className={styles.header}>
                <Typography className={styles.recipe_title}>{recipe.recipe_name}</Typography>
                <Typography className={styles.recipe_title} >
                    Chef: <Typography className={styles.chef_name}>{recipe.user.username}</Typography>
                </Typography>
            </Box>

            <Box className={styles.mainSection}>
                <Box className={styles.mediaBox}>
                    <Image
                        src={recipe.images[0]?.img}
                        alt="Recipe"
                        width={0}
                        height={0}
                        sizes="100%"
                        className={styles.recipeImage}
                    />
                </Box>
                <Box className={styles.infoBox}>
                    <Typography variant="body1" className={styles.description}>{recipe.description}</Typography>
                </Box>
            </Box>

            <Box component="section">
                <Typography variant="h5" className={styles.sectionBox}>Preparation Steps</Typography>
                <Box className={styles.stepsBox}>
                    {recipe.steps.map((step: any, index: number) => (
                        <Box key={step.uuid} className={styles.stepCard}>
                            <Typography className={styles.stepNumber}>{index + 1}.</Typography>
                            <Typography variant="body1">{step.steps_string}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
