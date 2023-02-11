export const existingCartItem = ({
    prevCartItems,
    nextCartItem
  }) => {
    return prevCartItems.find(
      cartItem => cartItem.documentID === nextCartItem.documentID
    );
  };



export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
  }) => {
    const quantityIncrement = 1;
    const minimumDays = 7;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  
    if (cartItemExists) { 
      return prevCartItems.map(cartItem =>
        cartItem.documentID == nextCartItem.documentID
          ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement
          } : cartItem
      );
    }
   
    if(nextCartItem.sellOrRent == 'sell'){
      return [
        ...prevCartItems,
        {
          ...nextCartItem,
          quantity: quantityIncrement,
          days: 1
        }
      ];
    }

    if(nextCartItem.sellOrRent == 'rent'){
      return [
        ...prevCartItems,
        {
          ...nextCartItem,
          quantity: quantityIncrement,
          days: minimumDays
        }
      ];
    }
    
  };


  export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
  }) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID);
  }

  export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
  }) => {
    const existingCartItem = prevCartItems.find(cartItem =>
      cartItem.documentID === cartItemToReduce.documentID);
  
    if (existingCartItem.quantity === 1) {
      return prevCartItems.filter(
        cartItem => cartItem.documentID !== existingCartItem.documentID
      );
    }
  
    return prevCartItems.map(cartItem =>
      cartItem.documentID === existingCartItem.documentID ?
      {
        ...cartItem,
        quantity: cartItem.quantity - 1
      } : cartItem)
  };

  export const handleIncreaseDays = ({
    prevCartItems,
    cartItemToReduce
  }) => {
    const existingCartItem = prevCartItems.find(cartItem =>
      cartItem.documentID === cartItemToReduce.documentID);
  
    return prevCartItems.map(cartItem =>
      cartItem.documentID === existingCartItem.documentID ?
      {
        ...cartItem,
        days: cartItem.days + 1
      } : cartItem)
  };


  export const handleDecreaseDays = ({
    prevCartItems,
    cartItemToReduce
  }) => {
    const existingCartItem = prevCartItems.find(cartItem =>
      cartItem.documentID === cartItemToReduce.documentID);
  
  if (existingCartItem.days === 7) {
    return prevCartItems;
    }
    return prevCartItems.map(cartItem =>
      cartItem.documentID === existingCartItem.documentID ?
      {
        ...cartItem,
        days: cartItem.days - 1
      } : cartItem)
  };