import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { setBook } from '../redux/actions/book';
import InputWrapper from './InputWrapper';
import { fetchUpdateBook, fetchAddBook } from '../redux/thunks/library';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const BookForm = ({
  book, errors, setBook, fetchUpdateBook, fetchAddBook,
}) => {
  const [title, setTitle] = useState(book ? book.title : '');
  const [subTitle, setSubTitle] = useState(book ? book.subtitle : '');
  const [authors, setAuthors] = useState(book ? book.authors : '');
  const [category, setCategory] = useState(book ? book.category : '');
  const [description, setDescription] = useState(book ? book.description : '');
  const [thumbnail, setThumbnail] = useState(book ? book.thumbnail : '');
  const [pageCount, setPageCount] = useState(book ? book.page_count : '');
  const [selectedTab, setSelectedTab] = useState('write');
  const router = useRouter();
  const saveBook = router.pathname.includes('edit') ? fetchUpdateBook : fetchAddBook;
  const handleSubmitBook = async (e) => {
    e.preventDefault();
    const savedBook = await saveBook(book.book_id, {
      book: {
        title,
        subtitle: subTitle,
        authors,
        category,
        description,
        published_date: book.publishedDate,
        thumbnail,
        page_count: pageCount,
        isbn: book.isbn,
      },
    });
    router.push('/library/[book]', `/library/${savedBook.book_id}`);
  };

  useEffect(() => () => setBook(null), []);
  const fieldErrorsAvailable = errors && errors.errors;

  return (
    <form>
      {
        errors && (
          <div className="error">
            { errors.message }
          </div>
        )
      }
      <div>
        <h4>
          ISBN:
          {' '}
          {book.isbn}
        </h4>
      </div>
      <InputWrapper
        setInput={setTitle}
        inputValue={title}
        labelValue="Title"
        type="text"
        inputId="title"
        error={fieldErrorsAvailable ? errors.errors.title : null}

      />
      <InputWrapper
        setInput={setSubTitle}
        inputValue={subTitle}
        labelValue="Subtitle"
        type="text"
        inputId="subtitle"
        error={fieldErrorsAvailable ? errors.errors.subtitle : null}
      />
      <InputWrapper
        setInput={setCategory}
        inputValue={category}
        labelValue="Category"
        type="text"
        inputId="category"
        error={fieldErrorsAvailable ? errors.errors.category : null}
      />
      <InputWrapper
        setInput={setAuthors}
        inputValue={authors}
        labelValue="Authors"
        type="text"
        inputId="authors"
        error={fieldErrorsAvailable ? errors.errors.authors : null}
      />
      <div className="container">
        <ReactMde
          value={description}
          onChange={setDescription}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))
        }
        />
      </div>
      <InputWrapper
        setInput={setThumbnail}
        inputValue={thumbnail}
        labelValue="Thumbnail"
        type="text"
        inputId="thumbnail"
        error={fieldErrorsAvailable ? errors.errors.thumbnail : null}
      />
      <img src={thumbnail} alt={book.title} />
      <InputWrapper
        setInput={setPageCount}
        inputValue={pageCount}
        labelValue="No. of Pages"
        type="text"
        inputId="page-count"
        error={fieldErrorsAvailable ? errors.errors.pageCount : null}
      />
      <button
        type="submit"
        className="add-book-btn"
        onClick={handleSubmitBook}
      >
        Submit Book
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  book: state.book,
  errors: state.errors,
});

export default connect(mapStateToProps, { setBook, fetchUpdateBook, fetchAddBook })(BookForm);
