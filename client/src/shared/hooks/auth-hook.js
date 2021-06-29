const { useState, useEffect, useCallback } = require("react");

let timeOutId;
export const useAuthHook = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  /****************************************************************************
   * Login and logout working correctly But  it is better useCallback hook
   * Login and logout function wraps with use callback so that is not
   * re-create unnecessarily to avoid infinite loops
   *****************************************************************************/
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  const login = useCallback((uid, token, expiration) => {
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60); // server send token which is expire in one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      timeOutId = setTimeout(logout, remainingTime);
    } else clearTimeout(timeOutId);
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const expirationDate = new Date(userData.expiration);
      if (userData.userId && userData.token && expirationDate > new Date()) {
        login(userData.userId, userData.token, expirationDate);
      }
    } catch (error) {
      logout();
    }
  }, [login, logout]);
  return { login, logout, userId, token };
};
