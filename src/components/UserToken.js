import { useState } from 'react';

function UserToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;
    try {
      const parsed = JSON.parse(tokenString);
      if (typeof parsed === 'string') {
        return parsed;
      }
      return parsed && parsed.token ? parsed.token : null;
    } catch (_err) {
      // Stored as raw JWT string (e.g., "eyJhbGciOi...")
      return tokenString;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // Accept either a raw string token or an object containing { token }
    const tokenValue = typeof userToken === 'string' ? userToken : userToken?.token;
    if (tokenValue) {
      // Store raw token string to avoid parse issues
      localStorage.setItem('token', tokenValue);
      setToken(tokenValue);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}

export default UserToken;
