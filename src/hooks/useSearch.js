import { useState } from 'react';

const useSearch = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (input, setFilters) => {
    setSearchInput(input);
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: input,
    }));
  };

  return { searchInput, handleSearch };
};

export default useSearch;
