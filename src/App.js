import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import Search from './Search';
import MainPage from './MainPage';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchPage: false,
    };
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/search" render={() => <Search />} />
      </div>
    );
  }
}

export default BooksApp;
