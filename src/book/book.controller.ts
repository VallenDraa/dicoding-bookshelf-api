import { type Request, type ResponseToolkit } from '@hapi/hapi';
import { hapiRes } from '../utils/response.js';
import {
	type BookSearch,
	type EditBook,
	type NewBook,
} from '../utils/validator.js';
import {
	createBookService,
	deleteBookService,
	editBookService,
	getAllBooksService,
	getBookByIdService,
} from './book.service.js';

export const createBookController = (request: Request, h: ResponseToolkit) => {
	const payload = request.payload as NewBook;

	// Validate input
	if (payload.readPage > payload.pageCount) {
		return hapiRes(h, {
			status: 'fail',
			message:
				'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		}).code(400);
	}

	if (!payload.name) {
		return hapiRes(h, {
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		}).code(400);
	}

	const bookId = createBookService(request.payload as NewBook);

	return hapiRes(h, {
		status: 'success',
		message: 'Buku berhasil ditambahkan',
		data: { bookId },
	}).code(201);
};

export const getAllBooksController = (request: Request, h: ResponseToolkit) => {
	const bookSearch = request.query as BookSearch;
	const books = getAllBooksService(bookSearch);

	return hapiRes(h, { status: 'success', data: { books } }).code(200);
};

export const getBookByIdController = (request: Request, h: ResponseToolkit) => {
	const params = request.params as { bookId: string };
	const book = getBookByIdService(params.bookId);

	return book
		? hapiRes(h, { status: 'success', data: { book } })
		: hapiRes(h, { status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
};

export const editBookController = (request: Request, h: ResponseToolkit) => {
	const params = request.params as { bookId: string };
	const payload = request.payload as EditBook;

	// Validate input
	if (payload.readPage > payload.pageCount) {
		return hapiRes(h, {
			status: 'fail',
			message:
				'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		}).code(400);
	}

	if (!payload.name) {
		return hapiRes(h, {
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		}).code(400);
	}

	const isEdited = editBookService(params.bookId, payload);

	return isEdited
		? hapiRes(h, {
				status: 'success',
				message: 'Buku berhasil diperbarui',
		  }).code(200)
		: hapiRes(h, {
				status: 'fail',
				message: 'Gagal memperbarui buku. Id tidak ditemukan',
		  }).code(404);
};

export const deleteBookController = (request: Request, h: ResponseToolkit) => {
	const params = request.params as { bookId: string };

	const isDeleted = deleteBookService(params.bookId);

	return isDeleted
		? hapiRes(h, {
				status: 'success',
				message: 'Buku berhasil dihapus',
		  }).code(200)
		: hapiRes(h, {
				status: 'fail',
				message: 'Buku gagal dihapus. Id tidak ditemukan',
		  }).code(404);
};
