import { jwtDecode } from "jwt-decode";

export function getUserFromToken(): any | null {
    if(typeof window == "undefined") return null;

    const token = localStorage.getItem("token");
    if(!token) return null;

    try {
        const user = jwtDecode(token);
        return user;
    } catch (error) {
        console.error("Invalid token: ", error);
        return null;
    }
}

