import React from 'react'
import sortBy from 'sort-by'

const Book = ({books, title, shelf, onChangeShelf}) => {
    
    return (
        // Sort books by title
        books.sort(sortBy('title')),
        /
        <div className="library">
            <h2 className="library-title">{title}</h2>
            <div className="library-books">
                <ol className="books-grid">
                    {books.filter((book) => book.shelf === `${shelf}`).map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: null }}></div>
                                <div className="library-changer">
                                    <select defaultValue = {shelf} onClick={(event) => onChangeShelf(event, book)}>
                                        <option value="noneSelected" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>   
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Book
