function jwtDecode(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    if (!token) {
        return true;
    }

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() >= expirationTime;
}

export const isAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    if (isTokenExpired(token)) return null;

    return jwtDecode(token);
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return token;
};

export const setAuth = (token) => {
    localStorage.setItem("token", token);
};

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("role");
};
