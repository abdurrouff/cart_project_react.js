const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      // const { amount } = cartItem;
      if (cartItem.id === action.payload) {
        console.log(cartItem.amount);
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount > 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === 'GET_TOTAL') {
    let { total, subAmount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.subAmount += amount;
        cartTotal.total += price * amount;
        return cartTotal;
      },
      {
        total: 0,
        subAmount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, subAmount };
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: 'true' };
  }
  // if (action.type === 'DISPLAY') {
  //   return { ...state, cart: action.payload, loading: 'false' };
  // }
  // return state;
};

export default reducer;
