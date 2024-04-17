import { type ResponseToolkit } from '@hapi/hapi';
import { type ApiResponse } from '../types/common.types.js';

export const apiResponse = <T>(response: ApiResponse<T>) => response;

export const hapiRes = <T>(h: ResponseToolkit, responseBody: ApiResponse<T>) =>
	h.response(apiResponse(responseBody));
