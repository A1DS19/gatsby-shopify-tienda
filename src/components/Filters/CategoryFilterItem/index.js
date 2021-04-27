import React from 'react';
import { Checkbox } from '../../common/Checkbox';
import { CategoryFilterItemWrapper } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

//actualiza url con ids de las collecciones

export const CategoryFilterItem = ({ title, collectionId }) => {
  const { search } = useLocation();
  //parse todos los query strings
  const qs = queryString.parse(search);

  //devuelve array con los ids
  const collectionIds = qs.c?.split(',').filter(c => !!c) || [];

  //si encuentra el id significa que el filtro esta aplicado
  const checked = collectionIds?.find(cId => cId === collectionId);

  //busqueda input
  const searchTerm = qs.s;

  //onClick decide si la casilla del filtro esta checkeada
  //de estarlo agrega el id de la colleccion a newIds
  const onClick = () => {
    let navigateTo = '/all-products';
    let newIds = [];

    if (checked) {
      newIds = collectionIds
        .filter(cId => cId !== collectionId)
        .map(cId => encodeURIComponent(cId));
    } else {
      collectionIds.push(collectionId);
      newIds = collectionIds.map(cId => encodeURIComponent(cId));
    }

    if (newIds.length && !searchTerm) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
    } else if (newIds.length && searchTerm) {
      navigate(
        `${navigateTo}?c=${newIds.join(',')}&s=${encodeURIComponent(
          searchTerm
        )}`
      );
    } else if (!newIds.length && searchTerm) {
      navigate(`${navigateTo}?s=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`${navigateTo}`);
    }
  };

  return (
    <CategoryFilterItemWrapper onClick={onClick}>
      <Checkbox checked={collectionIds.find(cId => cId === collectionId)} />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
};
