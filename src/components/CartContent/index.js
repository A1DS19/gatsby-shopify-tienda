import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem, CartHeader, CartFooter, Footer } from './styles';
import { QuantityAjuster } from '../QuantityAjuster';
import { RemoveLineItem } from '../RemoveLineItem';
import { Button } from '../common/Button';
import { navigate } from '@reach/router';

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
      {!!checkout?.lineItems && (
        <React.Fragment>
          <CartHeader>
            <div>Producto</div>
            <div>Precio Unitario</div>
            <div>Cantidad</div>
            <div>Total</div>
          </CartHeader>
          <div>{renderCheckoutItems}</div>
        </React.Fragment>
      )}

      {!!checkout?.lineItems && (
        <CartFooter>
          <div>
            <strong>Total Final:</strong>
          </div>
          <div>
            <span>₡{checkout?.totalPrice}</span>
          </div>
        </CartFooter>
      )}

      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>Continuar Comprando</Button>
        </div>
        <div>
          {!!checkout?.webUrl && (
            <Button onClick={() => (window.location.href = checkout.webUrl)}>
              Checkout
            </Button>
          )}
        </div>
      </Footer>
    </section>
  );
};
