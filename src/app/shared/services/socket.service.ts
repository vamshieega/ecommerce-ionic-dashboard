/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppData } from './app-data.service';



export type EMIT_EVENT = 'update' | 'upload' | 'userId' | 'new-order';
export type SOCKET_EVENT = 'connect' | 'disconnect' | 'error' | 'check-orders' | 'order-cancelled';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

	private socket;
	private socketUrl = AppData.socketUrl+'/order-notifications';
	private token;

  constructor() {
    AppData.token$.subscribe((token) => {
			this.token = token;
		});
  }

	initSocket(): void {
		console.log(this.socketUrl);
		console.log(this.token);
		// this.socket = socketIo(this.socketUrl);
		this.socket = (this.socketUrl, {
			path: '/restSockets/socket.io',
			transportOptions: {
				polling: {
					extraHeaders: {
						'x-access-token': this.token
					}
				}
			}
		});
	}

	closeSocket(): void {
		this.socket.close();
	}
	sendData(emitEventName: EMIT_EVENT, data: any) {
		this.socket.emit(emitEventName, data);
	}


	// public onEvent(event: SOCKET_EVENT): Observable<any> {
	// 	return new Observable<Event>(observer => {
	// 		this.socket.on(event, (data) => observer.next(data));
	// 	});
	// }
}
