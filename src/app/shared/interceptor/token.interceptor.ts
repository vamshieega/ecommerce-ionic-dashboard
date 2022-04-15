import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from '../services/app-data.service';
import { map } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor (){}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const mapApiUrl = req.url.split('?')[0];
		console.log(mapApiUrl);
		const token = AppData.token;
		console.log('called request interceptor', token);
		let headers = req.headers;
		headers = headers.append('Accept', 'application/json');
		if (mapApiUrl !== 'https://maps.googleapis.com/maps/api/geocode/json') {
			headers = headers.append('Content-Type', 'application/json');
			if (token) {
				headers = headers.append('x-access-token', token);
			}
			headers = headers.append('x-app-type', 'app-android');
		}
		console.log('====>', headers);
		req = req.clone({ headers });
		// return next.handle(req);
		return next.handle(req)
			.pipe(map(event => {
				if (event instanceof HttpResponse) {
					console.log(event);
					if (event.headers.get('x-access-token')) {
						AppData.token$.next(event.headers.get('x-access-token'));
					} 
				}
				return event;
			}));
	}
}