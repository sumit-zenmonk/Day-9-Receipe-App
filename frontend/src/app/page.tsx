"use client";

import { useEffect, useState } from "react";
import RecipeCardList from "@/component/reciepe-card-comp/page";

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/all_reciepe`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();
        setRecipes(data.receiepes);
      } catch (err: any) {
        setError(err.message);
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
