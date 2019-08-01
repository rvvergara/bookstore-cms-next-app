import { useState } from 'react';
import { connect } from 'react-redux';
import { searchLibrary } from '../redux/thunks/search';

const SearchForm = ({ searchTerm, searchLibrary }) => {
  const handleSearch = (keywords, e) => {
    e.preventDefault();
    searchLibrary(keywords);
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

export default connect(null, { searchLibrary })(SearchForm);
