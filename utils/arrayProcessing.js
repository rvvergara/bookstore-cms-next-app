export const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
  return unique;
};

export const sanitizeBooks = (books) => {
  return books..filter(
    book => book.imageLinks
    && book.description
    && book.authors
    && book.subtitle
    && book.categories
    && book.pageCount);
}

