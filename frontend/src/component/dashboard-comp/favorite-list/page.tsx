"use client";

import { useEffect, useState } from "react";
import { RootState } from "@/redux-store";
import { useAppSelector } from "@/redux-store/hooks";
import RecipeCardList from "@/component/reciepe-card-comp/page";
import { Box } from "@mui/material";

export default function FavRecipeListComp() {
  const token = useAppSelector(
    (state: RootState) => state.currentUserReducer.access_token
  );

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchFavRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/fav_reciepe`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: undefined,
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch favorite recipes");
        }
        const data = await res.json();
        setRecipes(data.user_receiepes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavRecipes();
  }, [token]);

  if (loading) return <div>Loading favorite recipes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <RecipeCardList recipes={recipes} />
    </Box>
  );
}
