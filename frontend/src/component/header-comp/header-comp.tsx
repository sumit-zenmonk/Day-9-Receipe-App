"use client"
import './header-comp.css'
import { Box, Button } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux-store/hooks";
import { logoutAction } from "@/redux-store/slices/curr-user";

export default function HeaderComp() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    });

    const handleAuthAction = async () => {
        try {
            if (isLoggedIn) {
                Cookies.remove("token");
                dispatch(logoutAction());
                setIsLoggedIn(false);
                router.replace('/dashboard');
            } else {
                router.push('/signin');
            }
        } catch (err) {
            console.log('Auth Action Error', err);
        }
    };

    const handleNavigationToggle = () => {
        if (pathname === "/") {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    };

    const isHomePage = pathname === "/";

    return (
        <header className="header">
            <Box className="left-container">
                <p>Recipe-App</p>
            </Box>

            <Box className="right-container">
                <Button
                    variant="contained"
                    onClick={handleNavigationToggle}
                >
                    {isHomePage ? "Dashboard" : "Home"}
                </Button>
                <Button
                    variant="contained"
                    color={isLoggedIn ? "error" : "primary"}
                    onClick={handleAuthAction}
                >
                    {isLoggedIn ? "Log-Out" : "Sign-In"}
                </Button>
            </Box>
        </header>
    )
}