import { useState } from 'react';

const SearchForm = ({ searchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching now');
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
          onClick={handleSearch}
        >
            Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
