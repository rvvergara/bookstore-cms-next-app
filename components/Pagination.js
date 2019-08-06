import Link from 'next/link';

const Pagination = ({ pages, queryPage }) => (
  <footer className="pagination">
    {
      queryPage > 1 && (
        <Link
          href={`/library?page=${queryPage - 1}`}
        >
          <a className="page-sequence">
            Previous
          </a>
        </Link>
      )
    }
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
    {
    queryPage < pages.length && (
      <Link
        href={`/library?page=${queryPage + 1}`}
      >
        <a className="page-sequence">
        Next
        </a>
      </Link>
    )
  }
  </footer>
);

export default Pagination;
