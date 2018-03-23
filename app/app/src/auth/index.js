const parseToken = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const storeLocalStorage = token => {
    /* todo fallbacks for localStorate */
    // poss store storage type in redux
    window.localStorage.setItem('dp_token', token);
};

export const setToken = token => {
  storeLocalStorage(token);
  return parseToken(token); // use in redux
};

export const getToken = () => {
  return window.localStorage.getItem('dp_token');
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('dp_token');
  }
};
