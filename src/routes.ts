import {type ServerRoute} from '@hapi/hapi';
import {
	bookIdValidator, bookSearchValidator, editBookValidator, newBookValidator,
} from './utils/validator.js';
import {
	createBookController, deleteBookController, editBookController, getAllBooksController, getBookByIdController,
} from './book/book.controller.js';

export const routes: ServerRoute[] = [
	{
		path: '/books',
		method: 'POST',
		options: {
			validate: {
				payload: newBookValidator,
			},
		},
		handler: createBookController,
	},

	{
		path: '/books',
		method: 'GET',
		options: {
			validate: {
				query: bookSearchValidator,
			},
		},
		handler: getAllBooksController,
	},

	{
		path: '/books/{bookId}',
		method: 'GET',
		options: {
			validate: {
				params: bookIdValidator,
			},
		},
		handler: getBookByIdController,
	},

	{
		path: '/books/{bookId}',
		method: 'PUT',
		options: {
			validate: {
				params: bookIdValidator,
				payload: editBookValidator,
			},
		},
		handler: editBookController,
	},

	{
		path: '/books/{bookId}',
		method: 'DELETE',
		options: {
			validate: {
				params: bookIdValidator,
			},
		},
		handler: deleteBookController,
	},

];
