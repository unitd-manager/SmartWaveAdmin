import { useState } from 'react';

function UserToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;
    const trimmed = tokenString.trim();
    const looksJson = trimmed.startsWith('{') || trimmed.startsWith('[') || trimmed.startsWith('"');
    if (!looksJson) {
      // Treat any non-JSON-looking value as a raw token (handles numerics like 123, JWTs, etc.)
      return tokenString;
    }
    try {
      const parsed = JSON.parse(tokenString);
      if (typeof parsed === 'string') return parsed;
      if (parsed && typeof parsed === 'object') {
        return parsed.token ?? null;
      }
      return null;
    } catch (_err) {
      // Fallback to raw string if parse fails
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
