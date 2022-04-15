import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor() {
		console.log('global error handler loaded');
	}
	handleError(error) {
		const message = error.message ? error.message : error.toString();
		console.log(message);
		console.log(error);
		
	}
}
