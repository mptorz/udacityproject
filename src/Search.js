/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Bookshelf from './Bookshelf';

export default class Search extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    userBooks: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      books: [],
    };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
    this.bookSearch(event.target.value);
  };

  bookSearch = (query) => {
    const { userBooks } = this.props;
    if (query.trim() !== 0) {
      search(query.trim()).then((books) => {
        if (books.length > 0) {
          const booksUpdated = books.map((book) => {
            const userBook = userBooks.find(ub => ub.id === book.id);
            if (userBook) {
              return userBook;
            }
            return book;
          });
          this.setState({ books: booksUpdated });
        }
      });
    }
  };

  render() {
    const { query, books } = this.state;
    const { changeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={event => this.handleChange(event)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query !== '' && (
              <Bookshelf changeShelf={changeShelf} title="Search results" books={books} />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
