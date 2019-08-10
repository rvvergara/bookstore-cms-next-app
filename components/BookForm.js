import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setBook } from '../redux/actions/book';
import InputWrapper from './InputWrapper';

const BookForm = ({ book, errors, setBook }) => {
  const [title, setTitle] = useState(book ? book.title : '');
  const [subTitle, setSubTitle] = useState(book ? book.subtitle : '');
  const [authors, setAuthors] = useState(book ? book.authors : '');
  const [description, setDescription] = useState(book ? book.description : '');
  const [thumbnail, setThumbnail] = useState(book ? book.thumbnail : '');
  const [pageCount, setPageCount] = useState(book ? book.page_count : '');

  useEffect(() => () => setBook(null));
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
        setInput={setAuthors}
        inputValue={authors}
        labelValue="Authors"
        type="text"
        inputId="authors"
        error={fieldErrorsAvailable ? errors.errors.authors : null}
      />
      <InputWrapper
        setInput={setDescription}
        inputValue={description}
        labelValue="Description"
        type="textarea"
        inputId="description"
        error={fieldErrorsAvailable ? errors.errors.description : null}
      />
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

export default connect(mapStateToProps, { setBook })(BookForm);
