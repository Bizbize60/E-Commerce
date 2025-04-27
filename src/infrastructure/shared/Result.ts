export interface Result<T> {
	value: T;
	message: string;
	isSuccess: boolean;
	isFailure: boolean;
}
