import React from 'react';
import CartContext from 'context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import { Icon } from './styles';

export const RemoveLineItem = ({ lineItemId }) => {
  const { removeLineItem } = React.useContext(CartContext);

  const handleRemoveItemClick = () => {
    removeLineItem(lineItemId);
  };

  return (
    <Icon onClick={handleRemoveItemClick}>
      <FaTrashAlt />
    </Icon>
  );
};
