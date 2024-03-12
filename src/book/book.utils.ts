import {type BookPreview, type Book} from './book.types.js';

export const formatBooks = (books: Book[]) => books.map<BookPreview>(({id, name, publisher}) => ({
	id, name, publisher,
}));
