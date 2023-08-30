export const getFromLocalStorage = (key) => {
  const result = JSON.parse(localStorage.getItem(key));
  return result;
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveCartByUser = (email, cart) => {
  let isExistedCart = false;
  const cartList = getFromLocalStorage("CART") || [];
  cartList.forEach((item) => {
    if (item.user === email) {
      item.cart = cart;
      isExistedCart = true;
    }
  });

  if (!isExistedCart) {
    cartList.push({ user: email, cart: cart });
  }
  setToLocalStorage("CART", cartList);
};

export const getCartByCurrentUser = () => {
  const curUser = getFromLocalStorage("CURRENT_USER");
  if (curUser) {
    const cartList = getFromLocalStorage("CART") || [];
    let result = [];
    cartList.forEach((item) => {
      if (item.user === curUser.email) {
        result = item.cart;
      }
    });
    return result;
  } else {
    return [];
  }
};

export const resetCurrentUserCart = () => {
  const curUser = getFromLocalStorage("CURRENT_USER");
  if (curUser) {
    const cartList = getFromLocalStorage("CART") || [];
    cartList.forEach((item) => {
      if (item.user === curUser.email) {
        item.cart = [];
      }
    });
    setToLocalStorage("CART", cartList);
  }
};

export const getCurrentUser = () => {
  const curUser = getFromLocalStorage("CURRENT_USER");
  return curUser;
};
