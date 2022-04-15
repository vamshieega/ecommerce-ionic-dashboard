import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AudioService {
	private audio: HTMLAudioElement;
	constructor() {
		this.audio = new Audio('assets/audio/order_notif.mp3');
	}

	playNotification() {
		// return this.audio.play();
		this.audio.load();
		this.audio.loop = true;
		return Promise.resolve().then(() => {
			this.audio.play();
		});
	}

	// for stop notification sound
	stopNotificationSound() {
		if (this.audio !== undefined) {
			this.audio.pause();
			this.audio.currentTime = 0.0;
		}
	}

}
