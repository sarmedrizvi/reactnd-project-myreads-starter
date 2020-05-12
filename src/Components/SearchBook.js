import React, { Component } from "react";
// import PropTypes from "prop-types";
import "../App.css";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";

export default class SearchBook extends Component {
  //   static propTypes = { prop: PropTypes };
  state = { search: "", searchBooks: [] };
  enterEvent = (event) => {
    if (event.key === "Enter") {
      search(this.state.search).then((res) => {
        this.setState({ searchBooks: res });
        console.log(this.state.searchBooks);
      });
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={this.state.search}
              placeholder="Search by title or author"
              onKeyDown={this.enterEvent}
              onChange={(event) =>
                this.setState({ search: event.target.value })
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks.smallThumbnail
                          })`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select>
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.subtitle}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
