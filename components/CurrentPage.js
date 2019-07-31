const CurrentPage = ({ currentPage }) => (
  <div>
    <p className="current-page">CURRENT PAGE</p>
    <p className="current-lesson">
      { currentPage === '0' ? 'Not started' : `Page ${currentPage}` }
    </p>
  </div>
);

export default CurrentPage;
