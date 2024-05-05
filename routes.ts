
// Public routes no authentication required

export const publicRoutes = [
    "/",
];


// Auth routes require authentication

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];


// prefix from api authentication routes

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";