"use client";

import { useEffect, useState } from "react";
import RecipeCardList from "@/component/reciepe-card-comp/page";
import { ApiCallService } from "@/services/http";
import { enqueueSnackbar } from "notistack";

type Recipe = {
  recipe_uuid: string;
  recipe_name: string;
  images: { uuid: string; img: string }[];
  steps: { uuid: string; steps_string: string }[];
  favoritedBy: { user_uuid: string; is_active: boolean }[];
  description: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await ApiCallService(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/all_reciepe`,
          "GET"
        );

        if (response && response.receiepes) {
          setRecipes(response.receiepes);
        } else {
          const errorMsg = response?.message || "Failed to fetch recipes";
          enqueueSnackbar(errorMsg, { variant: "error" });
        }
      } catch (err: any) {
        enqueueSnackbar(err?.message || "Something went wrong", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>{error}</div>;

  return <RecipeCardList recipes={recipes} />;
}
