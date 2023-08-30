import { getFromLocalStorage } from "../stores/userStorage";

export const USDollar = new Intl.NumberFormat("vi-VN", {
  currency: "VND",
});

export const isEmailNotDuplication = (email) => {
  let isValid = true;
  const arrUser = getFromLocalStorage("userArr") || [];
  if (arrUser.length === 0) return true;

  arrUser.forEach((user) => {
    if (user.email === email) {
      isValid = false;
    }
  });
  return isValid;
};

export const checkLogin = (email, password) => {
  let isValid = false;
  const arrUser = getFromLocalStorage("userArr") || [];
  if (arrUser.length === 0) return false;
  arrUser.forEach((user) => {
    if (user.email === email && user.password === password) {
      isValid = true;
    }
  });
  return isValid;
};

export const isNotEmpty = (data) => data.trim() !== "";
export const isMoreThanEightChar = (data) => data.length > 8;
export const isEmail = (data) => data.includes("@");

export const getAuthUserLoader = () => {
  const curUSer = getFromLocalStorage("CURRENT_USER");
  return curUSer;
};
