/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

export default class MainPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, changeShelf } = this.props;
    const shelves = [
      {
        name: 'currentlyReading',
        title: 'Currently Reading',
      },
      {
        name: 'wantToRead',
        title: 'Want to Read',
      },
      {
        name: 'read',
        title: 'Read',
      },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Bookshelf
                key={shelf.name}
                title={shelf.title}
                books={books.filter(b => b.shelf === shelf.name)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>

        <Link className="open-search" to="/search">
          Add a book
        </Link>
      </div>
    );
  }
}
