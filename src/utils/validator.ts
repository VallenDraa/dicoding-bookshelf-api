import Joi from 'joi';

export const bookIdValidator = Joi.object({ bookId: Joi.string().required() });

export type BookSearch = {
	name?: string;
	reading?: '0' | '1';
	finished?: '0' | '1';
};
export const bookSearchValidator = Joi.object<BookSearch, true>({
	name: Joi.string(),
	reading: Joi.string().valid('0', '1'),
	finished: Joi.string().valid('0', '1'),
});

export type NewBook = {
	name: string;
	year: number;
	author: string;
	summary: string;
	publisher: string;
	pageCount: number;
	readPage: number;
	reading: boolean;
};
export const newBookValidator = Joi.object<NewBook, true>({
	name: Joi.string().allow(''),
	year: Joi.number().required(),
	author: Joi.string().required(),
	summary: Joi.string().required(),
	publisher: Joi.string().required(),
	pageCount: Joi.number().required(),
	readPage: Joi.number().required(),
	reading: Joi.boolean().required(),
});

export type EditBook = {
	name: string;
	year: number;
	author: string;
	summary: string;
	publisher: string;
	pageCount: number;
	readPage: number;
	reading: boolean;
};
export const editBookValidator = Joi.object<EditBook, true>({
	name: Joi.string().allow(''),
	year: Joi.number().required(),
	author: Joi.string().required(),
	summary: Joi.string().required(),
	publisher: Joi.string().required(),
	pageCount: Joi.number().required(),
	readPage: Joi.number().required(),
	reading: Joi.boolean().required(),
});
