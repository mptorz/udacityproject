import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    const { changeShelf, id } = this.props;
    changeShelf(id, event.target.value);
  };

  render() {
    const {
      title, cover, authors, shelfName,
    } = this.props;
    const image = cover ? cover.smallThumbnail || cover.thumbnail : '';
    const shelf = shelfName || 'none';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${image}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors
              && authors.map((a, index) => (authors.length - 1 === index ? `${a} ` : `${a}, `))}
          </div>
        </div>
      </li>
    );
  }
}
