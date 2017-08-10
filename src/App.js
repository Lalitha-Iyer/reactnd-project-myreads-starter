import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

import { Route } from 'react-router-dom'
import Search from './Search'
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
    })
  }

  updateBookState = function (value, book) {
    this.setState((prevState) => {
      return prevState.books.map((b) => {
        if (book.id === b.id) {
          b.shelf = value
        }
      })
    })
    this.forceUpdate()
    BooksAPI.update(book, value)
      .then(console.log("update succesful"))

  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render= {()=> (
          <Search books={this.state.books} update={this.updateBookState.bind(this) }/>
         )} > </Route>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} update={this.updateBookState.bind(this)}  shelf="currentlyReading" title="Currently Reading" />
              <BookShelf books={this.state.books} update={this.updateBookState.bind(this)} shelf="wantToRead" title="Want to Read" />
              <BookShelf books={this.state.books} update={this.updateBookState.bind(this)} shelf="read"  title="Read" />

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
