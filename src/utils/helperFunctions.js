export function getUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  phoneNumber: /^\d{10}$/,
};

export const setCookie = (data) => {
  document.cookie = 'data=' + data?.accessToken;

  return true;
};

export const getSessionToken = () => {
  const token = document.cookie.split('=')[1];

  return token;
};

export const deleteCookie = () => {
  document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return true;
};
