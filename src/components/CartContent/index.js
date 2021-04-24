import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem, CartHeader, CartFooter } from './styles';
import { QuantityAjuster } from '../QuantityAjuster';
import { RemoveLineItem } from '../RemoveLineItem';

export const CartContent = () => {
  const { checkout, updateLineItem } = React.useContext(CartContext);

  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId });
  };

  const renderCheckoutItems = checkout?.lineItems.map(item => {
    return (
      <CartItem key={item.variant.id}>
        <div>
          <div>{item.title}</div>
          <div>
            {item.variant.title === 'Default Title' ? '' : item.variant.title}
          </div>
        </div>

        <div>₡{item.variant.price}</div>
        <div>
          <QuantityAjuster item={item} onAdjust={handleAdjustQuantity} />
        </div>
        <div>₡{(item.quantity * item.variant.price).toFixed(2)}</div>
        <div>
          <RemoveLineItem lineItemId={item.id} />
        </div>
      </CartItem>
    );
  });

  return (
    <section>
      <h1>Tu Carrito</h1>
      <CartHeader>
        <div>Producto</div>
        <div>Precio Unitario</div>
        <div>Cantidad</div>
        <div>Total</div>
      </CartHeader>
      <div>{renderCheckoutItems}</div>
      <CartFooter>
        <div>
          <strong>Total Final:</strong>
        </div>
        <div>
          <span>₡{checkout?.totalPrice}</span>
        </div>
      </CartFooter>
    </section>
  );
};
