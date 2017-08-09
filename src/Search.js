import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class Search extends React.Component {

  state = {
    searchBooks: []
  }
  componentDidMount() {
   this.updateSearchResults("")
   console.log("cdm3")
  }

  updateSearchResults =  (value)=> {
    BooksAPI.search(value.trim())
      .then((books) => {
        if (books && !books.error) {
          console.log(books)
          this.setState((prevState) => {
            books.map((book) => {
             let index = this.props.books.findIndex((e) => e.id === book.id)
              book.shelf = (index > -1) ? this.props.books[index].shelf : "none"
            })
            return { searchBooks: books }
          })
        }
      })
  }
  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateSearchResults(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
         <BookShelf books={this.state.searchBooks} update={this.props.update} />

    
        </div>
      </div>
)
  }
}

export default Search