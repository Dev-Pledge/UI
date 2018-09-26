const parseToken = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const storeLocalStorage = (token, tokenName = 'dp_token') => {
    /* todo fallbacks for localStorate */
    // poss store storage type in redux
    window.localStorage.setItem(tokenName, token);
};

export const setToken = token => {
  storeLocalStorage(token);
  return parseToken(token); // use in redux
};

export const getToken = (tokenName = 'dp_token') => {
  return window.localStorage.getItem(tokenName);
};

export const removeToken = (tokenName = 'dp_token') => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(tokenName);
  }
};
