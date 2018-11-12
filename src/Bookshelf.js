import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export default class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  render() {
    const { title, books, changeShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                shelfName={book.shelf}
                authors={book.authors}
                cover={book.imageLinks}
                changeShelf={changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
