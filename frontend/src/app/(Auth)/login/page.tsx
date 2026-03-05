"use client";

import {
    Box,
    Button,
    Checkbox,
    TextField,
    Typography
} from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiCallService } from "@/services/http";
import '../auth.css';
import { LoginInterface, LoginSchema } from "@/types/login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux-store/hooks";
import { currentUserAction } from "@/redux-store/slices/curr-user";

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<LoginInterface>(
        {
            resolver: zodResolver(LoginSchema),
            defaultValues: { email: "", password: "" },
        }
    );
    const email = watch("email");
    const password = watch("password");

    const onSubmit = async (data: LoginInterface) => {
        const response = await ApiCallService(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
            'POST',
            undefined,
            JSON.stringify({ email: data.email, password: data.password })
        );

        if (response && response.access_token) {
            enqueueSnackbar('Logged In Success', { variant: 'success' });
            dispatch(currentUserAction(response));
            Cookies.set("token", response.access_token);
            router.replace('/');
        } else {
            const errorMsg = Array.isArray(response?.message)
                ? response.message[0]
                : (response?.message || 'Something Went Wrong');
            enqueueSnackbar(errorMsg, { variant: 'error' });
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form" >
            <Box className="heading-section">
                <Typography variant="h4" className="title">Login  Your Account</Typography>
                <Typography className="description">Let's Build Something Together</Typography>
            </Box>

            <Box className="body-section">
                <Box className="fields-section">
                    <Controller name="email" control={control} render={({ field }) => (
                        <TextField {...field} label="email" error={!!errors.email} helperText={errors.email?.message} />
                    )} />

                    <Controller name="password" control={control} render={({ field }) => (
                        <TextField {...field} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} />
                    )} />
                </Box>

                <Box className="button-section">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!email || !password}
                    >
                        {isSubmitting ? "Processing..." : "Log In"}
                    </Button>
                    <Typography className="redirection">
                        Create new account? <Link href="/signup">SignUp</Link>
                    </Typography>
                </Box>
            </Box>
        </form>
    );
}