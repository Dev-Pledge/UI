const parse = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const storeLocalStorage = token => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('dp_token', token);
  }
};

export const set = token => {
  storeLocalStorage(token);
  return parse(token); // use in redux
};

export const get = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('dp_token');
  }
  return '';
};

export const remove = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('dp_token');
  }
};
