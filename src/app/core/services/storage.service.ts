import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	setItem(key: string, item: any) {
		localStorage.setItem(key, JSON.stringify(item));
	}
	getItem(key: string) {
		return JSON.parse(localStorage.getItem(key));
	}
	clearStorage() {
		localStorage.clear();
	}

	removeItem(key: string) {
		localStorage.removeItem(key);
	}

}
