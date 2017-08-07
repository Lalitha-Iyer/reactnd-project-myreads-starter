import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
const escapeStringRegexp = require('escape-string-regexp');
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({ searchBooks: this.state.books });
    })
  }

  updateBookState = (value, id) => {
    this.setState((prevState) => {
      prevState.books.map((book) => {
        if (id === book.id) {
          book.shelf = value
          BooksAPI.update(book, value)
            .then(console.log("update succesful"))
        }
      })
    })

  }

  updateSearchResults = (value) => {
    let regex = new RegExp(escapeStringRegexp(value.trim()), 'i')
    this.setState((prevState) => {
      return { searchBooks: prevState.books.filter((book) => regex.test(book.title)) }
    })
  }


  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateSearchResults(event.target.value)} />

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf books={this.state.searchBooks} update={this.updateBookState} />
            </div>
          </div>)}>
        </Route>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} update={this.updateBookState} shelf="currentlyReading" title="Currently Reading" />
              <BookShelf books={this.state.books} update={this.updateBookState} shelf="wantToRead" title="Want to Read" />
              <BookShelf books={this.state.books} update={this.updateBookState} shelf="read" title="Read" />

            </div>
            <div className="open-search">
              <Link className='open-search' to='/search'>Search</Link>
            </div>
          </div>)}>

        </Route>


      </div>
    )
  }
}

export default BooksApp
