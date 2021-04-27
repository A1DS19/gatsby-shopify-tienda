import React from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { search } = useLocation();
  const categoryIds = queryString.parse(search)?.c || '';

  const handleSubmit = e => {
    e.preventDefault();

    if (categoryIds) {
      navigate(
        `/all-products?s=${encodeURIComponent(
          searchTerm
        )}&c=${encodeURIComponent(categoryIds)}`
      );
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        placeholder="Buscar"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
};
