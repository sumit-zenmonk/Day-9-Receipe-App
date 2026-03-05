import { useEffect, useState } from "react";
import { RootState } from "@/redux-store";
import { useAppSelector } from "@/redux-store/hooks";
import RecipeCardList from "@/component/reciepe-card-comp/page";

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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reciepe`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();
        setRecipes(data.user_receiepes);

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
