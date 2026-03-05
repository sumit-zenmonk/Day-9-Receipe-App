'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import styles from './recipe.module.css';

export default function RecipeClientPage() {
    const params = useParams();
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search_reciepe/id/${params.reciepe_uuid}`);
                const result = await response.json();
                setRecipe(result.data);
            } catch (e) {
                console.error(e);
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
            <Box className={styles.contentWrapper}>
                <Box component="header">
                    <Typography variant="h3">{recipe.recipe_name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Chef: {recipe.user.username}
                    </Typography>
                </Box>

                <Divider />

                <Box className={styles.mainSection}>
                    <Box className={styles.mediaBox}>
                        <img
                            src={recipe.images[0]?.img}
                            alt="Recipe"
                        />
                    </Box>
                    <Box className={styles.infoBox}>
                        <Typography variant="h5" gutterBottom>About this dish</Typography>
                        <Typography variant="body1">{recipe.description}</Typography>
                    </Box>
                </Box>

                <Box component="section">
                    <Typography variant="h5" sx={{ mb: '2%' }}>Preparation Steps</Typography>
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
