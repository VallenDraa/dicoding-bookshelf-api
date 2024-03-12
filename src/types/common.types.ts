export type Store<T> = {
	data: T;
	get: () => T;
	update: (updater: (newData: T) => T) => void;
};

export type ApiResponse<T> = {
	status: string;
	message?: string;
	data?: T;
};
