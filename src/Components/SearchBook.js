import React, { Component } from "react";
// import PropTypes from "prop-types";
import "../App.css";
import { search, update } from "../BooksAPI";
import { Link } from "react-router-dom";

export default class SearchBook extends Component {
  state = { books: [], searchValue: "", selectedOption: "", searchBooks: [] };
  selectChange = (value, book) => {
    this.setState({ selectedOption: value.target.value }, () => {
      // console.log(this.state.selectedOption);
      update(book, this.state.selectedOption);
    });
  };
  componentDidMount() {
    const appBooks = this.props.AppBooks;
    if (appBooks) {
      this.setState(
        {
          books: [
            ...appBooks.read,
            ...appBooks.wantToRead,
            ...appBooks.currentlyReading,
          ],
        },
        () => {
          // console.log(this.state.books);
        }
      );
    }

    // for (const book in this.props.AppBooks) {
    //   // this.setState(
    //   //   (prev) => {
    //   //     return { books: prev.books.push(this.props.AppBooks[book]) };
    //   //   },
    //   //   () => {
    //   //     console.log(this.state.books);
    //   //   }
    //   // );
    // }
  }

  render() {
    const TextChangeEvent = (event) => {
      this.setState({
        searchValue: event.target.value,
      });
      if (this.state.searchValue === "") {
        this.setState({ searchBooks: [] });
        return;
      }
      search(this.state.searchValue)
        .then((res) => {
          if (res && !res.error)
            this.filtered = res.map((book) => {
              const check = this.state.books.find(
                (Checkbook) => Checkbook.id === book.id
              );
              if (check) {
                return { ...book, shelf: check.shelf };
              } else {
                return book;
              }
            });

          this.setState({ searchBooks: this.filtered }, () => {
            if (this.state.searchValue === "") {
              this.setState({
                searchBooks: [],
              });
              return;
            }
          });

          // console.log(this.state.searchBooks);
        })
        .catch((err) => {
          console.log(err);
          this.setState({ searchBooks: [] });
        });
    };
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
              placeholder="Search by title or author"
              onChange={TextChangeEvent}
              value={this.state.searchValue}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.length !== 0 ? (
              this.state.searchBooks.map((book) => {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks &&
                              book.imageLinks.smallThumbnail})`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={(event) => this.selectChange(event, book)}
                            value={book.shelf}
                          >
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
                      {book.authors &&
                        book.authors.map((author) => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                    </div>
                  </li>
                );
              })
            ) : (
              <li />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
