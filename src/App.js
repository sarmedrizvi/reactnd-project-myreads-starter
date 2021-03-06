import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

import { Route } from "react-router-dom";
import BooksApp from "./Components/Category";
import SearchBook from "./Components/SearchBook";
class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  };
  formRef = React.createRef();
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          component={() => <BooksApp ref={this.formRef} />}
        />
        <Route
          path="/search"
          component={() => (
            <SearchBook
              AppBooks={this.formRef.current && this.formRef.current.state}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
