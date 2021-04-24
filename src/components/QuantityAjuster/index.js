import React from 'react';
import { QuantityAjusterWrapper, AdjusterButton } from './styles';

export const QuantityAjuster = ({ item, onAdjust }) => {
  const { quantity } = item;

  const handleDecrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: -1 });
  };

  const handleIncrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: 1 });
  };

  return (
    <QuantityAjusterWrapper>
      <AdjusterButton onClick={handleDecrementQuantity}>-</AdjusterButton>
      <div>{quantity}</div>
      <AdjusterButton onClick={handleIncrementQuantity}>+</AdjusterButton>
    </QuantityAjusterWrapper>
  );
};
