import React from 'react'


class BookShelf extends React.Component {

  render() {
    const { books } = this.props
    const {title} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.filter((book)=> title? book.state === title : true)
              .map((book, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.url})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(event)=>this.props.update(event.target.value, book.title)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="Currently Reading"  selected={book.state === "Currently Reading"}>Currently Reading</option>
                          <option value="Want to Read" selected={book.state === "Want to Read"}>Want to Read</option>
                          <option value="Read" selected={book.state === "Read"}>Read</option>
                          <option value="None" selected={book.state === "none"}>None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">book.title</div>
                    <div className="book-authors">book.author</div>
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