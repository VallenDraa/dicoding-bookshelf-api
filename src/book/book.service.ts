import {type BookSearch, type NewBook} from './../utils/validator.js';
import {type Book} from './book.types.js';
import {booksStore} from './book.store.js';
import {nanoid} from 'nanoid';
import {formatBooks} from './book.utils.js';

export const createBookService = (bookData: NewBook) => {
	const currentDate = new Date().toISOString();
	const newBook: Book = {
		id: nanoid(),
		...bookData,
		finished: bookData.pageCount === bookData.readPage,
		insertedAt: currentDate,
		updatedAt: currentDate,
	};

	// Update the store
	booksStore.update(books => [...books, newBook]);

	return newBook.id;
};

export const getAllBooksService = (bookSearch: BookSearch) => {
	const books = booksStore.get();

	if (!bookSearch.finished && !bookSearch.reading && !bookSearch.name) {
		return formatBooks(books);
	}

	return formatBooks(books.filter(book => {
		const isIncludedByName
			= book.name.toLocaleLowerCase().includes(
				bookSearch.name ? bookSearch.name.toLocaleLowerCase() : '',
			);
		const isIncludedByReadingStatus
			= bookSearch.reading === undefined || book.reading === (bookSearch.finished === '1');
		const isIncludedByFinishedStatus
			= bookSearch.finished === undefined || book.finished === (bookSearch.finished === '1');

		return isIncludedByName && isIncludedByReadingStatus && isIncludedByFinishedStatus;
	}));
};

export const getBookByIdService = (bookId: string) => {
	const books = booksStore.get();
	const targetBook = books.find(book => book.id === bookId);

	return targetBook;
};

export const editBookService = (bookId: string, bookData: NewBook) => {
	let isUpdated = false;
	booksStore.update(books => {
		const updatedBooks = books.map(book => {
			if (book.id === bookId) {
				isUpdated = true;
				return {...book, ...bookData, updatedAt: new Date().toISOString()};
			}

			return book;
		});

		return updatedBooks;
	});

	return isUpdated;
};

export const deleteBookService = (bookId: string) => {
	let isDeleted = false;
	booksStore.update(books => books.filter(book => {
		if (book.id === bookId) {
			isDeleted = true;
			return false;
		}

		return true;
	}));

	return isDeleted;
};
