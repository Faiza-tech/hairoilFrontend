// Save user after login
export const saveUser = (userData) => {
  const expiresAt = Date.now() + 4 * 60 * 60 * 1000;

  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      ...userData,
      expiresAt,
    })
  );
};

// Get logged-in user
export const getUser = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) return null;

    if (Date.now() > userInfo.expiresAt) {
      logout();
      return null;
    }

    return userInfo;
  } catch {
    return null;
  }
};

// Get JWT token
export const getToken = () => {
  return getUser()?.token || null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("userInfo");
};

