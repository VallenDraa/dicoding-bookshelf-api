import { type Book } from '../book/book.types.js';
import { type Store } from '../types/common.types.js';

export const booksStore: Store<Book[]> = {
	data: [],
	get: () => booksStore.data,
	update(updater) {
		booksStore.data = updater(booksStore.data);
	},
};
