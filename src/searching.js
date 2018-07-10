import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class BooksSearch extends Component {

    state = {
        query: '',
        books_searched: []
    }

    // Search books
   books_searched = (query) => {
        let trimQuery = query.trim()
        this.setState({query: trimQuery})
        BooksAPI.search(trimQuery)
        // Check the response is not empty 
            .then(response => (response && response.length) ?
                this.setState({books_searched: response.map(book_searched => {
                    const book = this.props.books.find(book => book.id === book_searched.id)
                    if(book) {
                        return book
                    } else {
                        return books_searched;
                    }
                })
            })
                :   this.setState({books_searched: []}) 
        )
    }

    render() {
        const { books_searched, query } = this.state
        // Sort books by title
        books_searched.sort(sortBy('title'))

        return(
            <div className="search-books">
            <div className="search_bar">
                { }
                <Link
                    to='/'
                    className="close-search"
                >
                Close</Link>
                <div className="search-books-input-wrapper">
                {/*
			
                */}
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.books_searched(event.target.value)}
                />
              </div>
            </div>
            {/* Content of the search result */}
            <div className="search-books-results">
                <h2 className="bookshelf-title">Results</h2>
                <ol className="books-grid">
                    {books_searched.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: null }}></div>
                                <div className="book-shelf-changer">
                                    <select defaultValue = {book.shelf ? book.shelf : "none"} onClick={(event) => this.props.onChangeShelf(event, book)}>
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
}

export default BooksSearch
