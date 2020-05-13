import React from "react";
// import * as BooksAPI from './BooksAPI'
import "../App.css";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";

class BooksApp extends React.Component {
 
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */ selectedOption: "",
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };
  selectChange = (value, book) => {
    this.setState({ selectedOption: value.target.value }, () => {
      // console.log(this.state.selectedOption);
      update(book, this.state.selectedOption).then((res) => {
        this.getAllBooks();
      });
    });
  };
  getAllBooks = () => {
    getAll().then((res) => {
      this.setState({
        currentlyReading: res.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: res.filter((book) => book.shelf === "wantToRead"),
        read: res.filter((book) => book.shelf === "read"),
      });
      // this.props.getBook(res);
      // console.log(res)
    });
  };
  componentDidMount() {
    this.getAllBooks();
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.currentlyReading.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="currentlyReading"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
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
                        {book.authors.map((author) => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.wantToRead.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="wantToRead"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
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
                        {book.authors.map((author) => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.read.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="read"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
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
                        {book.authors.map((author) => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksApp;
