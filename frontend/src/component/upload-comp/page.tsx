"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "@/redux-store/hooks";
import { RootState } from "@/redux-store";

export default function AddRecipeDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const token = useAppSelector(
        (state: RootState) => state.currentUserReducer.access_token
    );

    const [recipeName, setRecipeName] = useState("");
    const [description, setDescription] = useState("");
    const [steps, setSteps] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!file || !token) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("imageUrl", file);

            const uploadRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`,
                {
                    method: "POST",
                    headers: {
                        Authorization: token,
                    },
                    body: formData,
                }
            );

            const uploadData = await uploadRes.json();
            const imagePath = uploadData.image_urls[0].path;
            await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/reciepe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        recipe_name: recipeName,
                        description,
                        steps_string: steps.split(","),
                        img: imagePath,
                    }),
                }
            );
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Recipe</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Recipe Name"
                    fullWidth
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />

                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    label="Steps (comma separated)"
                    fullWidth
                    multiline
                    rows={3}
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                    }
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} /> : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}