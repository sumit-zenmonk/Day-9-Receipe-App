"use client"

import { useEffect, useState } from "react";
import { RootState } from "@/redux-store";
import { useAppSelector } from "@/redux-store/hooks";
import RecipeCardList from "@/component/reciepe-card-comp/page";
import { ApiCallService } from "@/services/http";
import { enqueueSnackbar } from "notistack";

export default function ReciepeListComp() {
  const token = useAppSelector(
    (state: RootState) => state.currentUserReducer.access_token
  );

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await ApiCallService(`
          ${process.env.NEXT_PUBLIC_BACKEND_URL}/reciepe`,
          'GET',
          {
            Authorization: token,
          },
          undefined
        );

        if (!res.user_receiepes) {
          enqueueSnackbar("Failed to fetch recipes", { variant: "error" })
        } else {
          setRecipes(res.user_receiepes);
          enqueueSnackbar("fetch recipes success", { variant: "success" })
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <RecipeCardList recipes={recipes} />
  );
}
