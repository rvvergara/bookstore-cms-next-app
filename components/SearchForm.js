import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { setAuthorizationToken } from '../utils/api';

const SearchForm = ({
  searchTerm, token,
}) => {
  const router = useRouter();
  const handleSearch = (keywords, e) => {
    setAuthorizationToken(token);
    e.preventDefault();
    const pushPath = router.pathname.includes('admin')
      ? `/admin/library/search?q=${keywords}`
      : `/library/search?q=${keywords}`;
    router.push(pushPath);
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

export default connect(
  mapStateToProps,
)(SearchForm);
