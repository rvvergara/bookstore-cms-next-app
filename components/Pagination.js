import Link from 'next/link';

const Pagination = ({ pages, queryPage, path }) => (
  <footer className="pagination">
    {
      queryPage > 1 && (
        <Link
          href={`${path}page=${queryPage - 1}`}
        >
          <a className="previous-link page-sequence">
            Previous
          </a>
        </Link>
      )
    }
    <span className="page-numbers-container">
      {
        pages.map((page) => {
          const activeClass = page === queryPage ? 'active-page' : '';
          return (
            <Link
              key={page}
              href={`/library?page=${page}`}
            >
              <a
                className={`page-number ${activeClass}`}
              >
                {page}

              </a>
            </Link>
          );
        })
    }
    </span>
    {
    queryPage < pages.length && (
      <Link
        href={`/library?page=${queryPage + 1}`}
      >
        <a className="next-link page-sequence">
        Next
        </a>
      </Link>
    )
  }
  </footer>
);

export default Pagination;
