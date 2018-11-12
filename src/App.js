import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import MainPage from './MainPage';
import { getAll, update } from './BooksAPI';

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
    getAll().then(books => this.setState(() => ({ books })), error => console.log(error));
  };

  changeShelf = (bookId, shelf) => {
    update({ id: bookId }, shelf).then(
      () => {
        const { books } = this.state;
        const bookToBeChanged = books.find(b => b.id === bookId);
        bookToBeChanged.shelf = shelf;
        const otherBooks = books.filter(b => b.id !== bookId);
        this.setState({ books: [...otherBooks, bookToBeChanged] });
      },
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
          render={() => <MainPage books={books} changeShelf={this.changeShelf} />}
        />
        <Route
          path="/search"
          render={() => <Search userBooks={books} changeShelf={this.changeShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
