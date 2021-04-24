import React from 'react';
import { CartWrapper } from './styles';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from 'context/CartContext';

export const Cart = () => {
  const { checkout } = React.useContext(CartContext);
  let totalQuantity = 0;
  if (checkout) {
    checkout.lineItems.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
    });
  }

  return (
    <CartWrapper>
      <FaShoppingCart size="1.5em" />
      <div>
        {totalQuantity} item(s)/ ₡{Math.floor(checkout?.totalPrice) || '0.00'}
      </div>
    </CartWrapper>
  );
};
