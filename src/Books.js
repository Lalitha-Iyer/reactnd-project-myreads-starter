import React from 'react'

class Book extends React.Component{

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
          book.shelf = value
        }
      })
    })
    this.forceUpdate()
    BooksAPI.update(book, value)
      .then(console.log("update succesful"))

  }

  


}