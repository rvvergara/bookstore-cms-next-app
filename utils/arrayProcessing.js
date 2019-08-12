export const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
  return unique;
};

export const sanitizeBooks = books => books.filter(
  book => book.imageLinks
    && book.description
    && book.authors
    && book.subtitle
    && book.categories
    && book.industryIdentifiers
    && book.industryIdentifiers[0].type === 'ISBN_13'
    && book.pageCount,
);

export const processGoogleBooksResults = async (items, checkingFn) => {
  const processedItems = items.map(({ id, volumeInfo }) => ({
    id,
    ...volumeInfo,
  }));

  const uniqueItems = getUnique(processedItems, 'id');
  const validItems = sanitizeBooks(uniqueItems);
  const shownItems = validItems.slice(0, 10);

  for (const book of shownItems) {
    console.log(book.title, book.industryIdentifiers);
    const isbn = book.industryIdentifiers[0].identifier;
    const mappedToLibrary = await checkingFn(isbn);
    book.inLibrary = mappedToLibrary.inLibrary;
    book.book_id = mappedToLibrary.book_id;
  }

  return shownItems;
};

export const processGoogleBook = async (book, checkingFn) => {
  const isbn = book.industryIdentifiers[0].type === 'ISBN_13' ? book.industryIdentifiers[0].identifier : book.industryIdentifiers[1].identifier;
  const authors = book.authors.join(', ');
  const category = book.categories[0];
  const thumbnail = book.imageLinks.smallThumbnail;
  const page_count = book.pageCount;
  const mappedToLibrary = await checkingFn(isbn);
  book.inLibrary = mappedToLibrary.inLibrary;
  book.book_id = mappedToLibrary.book_id;

  return {
    ...book, isbn, authors, category, thumbnail, page_count, included: false, item_id: null,
  };
};
