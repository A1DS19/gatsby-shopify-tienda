import React from 'react';
import { ProductQuantityAdderWrapper } from './styles';
import { Button } from 'components';
import { Input } from 'components';
import CartContext from 'context/CartContext';

export const ProductQuantityAdder = ({ variantId, available }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { updateLineItem } = React.useContext(CartContext);

  const handleQuantityChange = e => {
    setQuantity(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //pasar como objecto
    updateLineItem({ variantId, quantity: parseInt(quantity, 10) });
  };

  return (
    <ProductQuantityAdderWrapper>
      <strong>Cantidad</strong>
      <form onSubmit={handleSubmit}>
        <Input
          disable={!available}
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          min="1"
          step="1"
        />
        <Button type="submit" disable={!available} fullWidth>
          AGREGAR A CARRITO
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
};
