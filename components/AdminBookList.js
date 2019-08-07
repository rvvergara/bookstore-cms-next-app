import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';

const AdminBookList = ({ books }) => (
  <SearchForm />
);

export default AdminBookList;
