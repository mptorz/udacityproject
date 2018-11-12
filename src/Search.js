import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { search } from './BooksAPI';
import Bookshelf from './Bookshelf';

export default class Search extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    userBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      books: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { userBooks } = this.props;
    const { query } = this.state;
    if (prevProps.userBooks !== userBooks) {
      this.bookSearch(query);
    }
  }

  handleChange = (event) => {
    const q = event.target.value;
    this.setState({ query: q });
    if (q.trim() !== '') {
      this.bookSearch(q);
    } else {
      this.setState({ books: [] });
    }
  };

  bookSearch = (query) => {
    const { userBooks } = this.props;
    search(query.trim()).then((books) => {
      if (books.length > 0 && !('error' in books)) {
        const booksUpdated = books.map((book) => {
          const userBook = userBooks.find(ub => ub.id === book.id);
          if (userBook) {
            return userBook;
          }
          return book;
        });
        this.setState({ books: booksUpdated });
      } else {
        this.setState({ books: [] });
      }
    });
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
            <DebounceInput
              type="text"
              value={query}
              debounceTimeout={300}
              onChange={event => this.handleChange(event)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 && (
              <Bookshelf changeShelf={changeShelf} title="Search results" books={books} />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
