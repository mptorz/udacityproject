import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = (props) => {
  const { title, books, changeShelf } = props;
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
};

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Bookshelf;
