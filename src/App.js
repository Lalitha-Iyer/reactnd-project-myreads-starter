import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

import { Route } from 'react-router-dom'
import Search from './Search'
class BooksApp extends React.Component {


  state = {
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
              <BookShelf books={this.state.books} update={this.updateBookState.bind(this)} location={window.location}  shelf="currentlyReading" title="Currently Reading" />
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
