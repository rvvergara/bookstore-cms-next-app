import { useRouter } from 'next/router';

const Book = ({
  title,
  subtitle,
  authors,
  description,
  thumbnail,
  included,
}) => {
  const router = useRouter();
  return (
    <div className="book-container">
      <h3>
        {title}
        {' '}
-
        {' '}
        {subtitle}
      </h3>
      <h4>
        { authors }
      </h4>
      <div>
        <img src={thumbnail} alt={title} />
        <p>
          { description }
        </p>
        <div>
          <button
            type="button"
            onClick={() => console.log('Hello')}
          >
            {
              included ? 'Remove From Collection' : 'Add To Collection'
            }
          </button>
        </div>
        <span
          role="button"
          tabIndex="0"
          className="back-button"
          onClick={() => router.back()}
          onKeyDown={() => router.back()}
        >
          &#x2b05;
          Back
        </span>
      </div>
    </div>
  );
};

export default Book;
