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
    const isbn = book.industryIdentifiers[0].identifier;
    book.inLibrary = await checkingFn(isbn);
  }

  return shownItems;
};
