"use client"
import Image from "next/image"
import './header-comp.css'
import { Box, Button } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderComp() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleAuthAction = () => {
        try {
            if (isLoggedIn) {
                Cookies.remove("token");
                localStorage.removeItem("persist:root");
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