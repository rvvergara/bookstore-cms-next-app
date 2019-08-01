import { useState } from 'react';
import Router from 'next/router';

const SearchForm = ({ searchTerm }) => {
  const handleSearch = (keywords, e) => {
    e.preventDefault();
    const path = `/library/search?q=${keywords}`;
    Router.push(path);
  };

  const [keywords, setKeywords] = useState(searchTerm || '');

  return (
    <div className="form-wrapper search-form">
      <form className="form">
        <input
          type="search"
          className="form-input"
          placeholder="Search books, authors, etc"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
        />
        <button
          type="submit"
          className="add-book-btn btn-sm"
          onClick={e => handleSearch(keywords, e)}
        >
            Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
