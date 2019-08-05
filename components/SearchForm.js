import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { setAuthorizationToken } from '../utils/api';
import { searchLibrary } from '../redux/thunks/search';

const SearchForm = ({ searchTerm, searchLibrary, token }) => {
  setAuthorizationToken(token);
  const handleSearch = (keywords, e) => {
    e.preventDefault();
    searchLibrary(keywords)
      .then(() => Router.push(`/library/search?q=${keywords}`));
  };

  const [keywords, setKeywords] = useState(searchTerm || '');

  useEffect(() => {
    setKeywords(searchTerm);
  }, [searchTerm]);

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

const mapStateToProps = state => ({
  token: state.currentUser.data ? state.currentUser.data.token : null,
  searchTerm: state.searchTerm,
});

export default connect(mapStateToProps, { searchLibrary })(SearchForm);
