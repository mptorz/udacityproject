import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => this.setState(() => ({ books })), error => console.log(error));
  };

  updateBookAllocation = (bookId, shelf) => {
    BooksAPI.update({ id: bookId }, shelf).then(
      () => this.getAllBooks(),
      error => console.log(error),
    );
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <MainPage books={books} changeShelf={this.updateBookAllocation} />}
        />
        <Route
          path="/search"
          render={() => <Search userBooks={books} changeShelf={this.updateBookAllocation} />}
        />
      </div>
    );
  }
}

export default BooksApp;
