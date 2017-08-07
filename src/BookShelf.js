import React from 'react'


class BookShelf extends React.Component {

  render() {
    const { books } = this.props
    const { title, shelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.filter((book) => title ? book.shelf === shelf : true)
                .map((book, index) => (
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select onChange={(event) => this.props.update(event.target.value, book.id)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading" selected={book.shelf==="currentlyReading"} >Currently Reading</option>
                            <option value="wantToRead" selected={book.shelf==="wantToRead"}>Want to Read</option>
                            <option value="read" selected={book.shelf==="read"} >Read</option>
                            <option value="None" >None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))
            }
          </ol>
        </div>
      </div>

    )
  }

}

export default BookShelf