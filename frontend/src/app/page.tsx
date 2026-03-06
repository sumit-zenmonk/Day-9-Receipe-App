"use client";

import { useEffect, useState } from "react";
import RecipeCardList from "@/component/reciepe-card-comp/page";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { RootState } from "@/redux-store";
import { getglobalData } from "@/redux-store/thunk/global-data";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(
    (state: RootState) => state.globalDataReducer
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(getglobalData());
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return <RecipeCardList recipes={recipes} />;
}
