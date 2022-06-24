const TOKEN_KEY = "jwt_token";
const REFRESH_KEY = "jwt_refresh_token";
const EXPIRES_KEY = "jwt_expires";
const USERID_KEY = "user_local_id";

export function setTokens({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    localStorage.getItem(REFRESH_KEY);
}
export function getExpairesDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

const localStorageServise = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpairesDate,
    getUserId,
    removeAuthData
};

export default localStorageServise;
