import { Injectable, Input } from '@angular/core';
import { AppData } from './app-data.service';
@Injectable({
	providedIn: 'root'
})
export class PermissionsService {
	@Input() feature: string;
	constructor() { }
	isAuthorized(allowedRoles: string): boolean {
		if (allowedRoles == null || allowedRoles.length === 0) {
			return true;
		}
		if (AppData.userData._permissions.hasOwnProperty(allowedRoles)) {
			let isPermission = AppData.userData._permissions[allowedRoles];
			if (!isPermission) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
}
