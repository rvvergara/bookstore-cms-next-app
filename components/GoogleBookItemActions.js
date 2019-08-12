import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setAuthorizationToken } from '../utils/api';

const GoogleBookItemActions = ({
  book,
}) => {
  const {
    title, imageLinks, inLibrary, authors, description, subtitle, infoLink, book_id, industryIdentifiers,
  } = book;

  const { identifier: isbn } = industryIdentifiers[0];
  return (
    <div className="library-item__actions">
      <Link
        href={infoLink}
      >
        <a
          className="library-item__actions__link"
          target="blank"
        >
          See on Google Books
        </a>
      </Link>
      <Link
        href={inLibrary ? '/admin/library/[book]/edit' : '/admin/library/add-book/[book]'}
        as={inLibrary ? `/admin/library/${book_id}/edit` : `/admin/library/add-book/${isbn}`}
      >
        <a className="library-item__actions__link">
          {inLibrary ? 'Manage' : 'Add To Library'}
        </a>
      </Link>
    </div>
  );
};

export default GoogleBookItemActions;
