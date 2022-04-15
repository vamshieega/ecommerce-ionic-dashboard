
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable(
    { providedIn: 'root' }
)
export class LoginGuard implements CanActivate {
    constructor() {
    }
    canActivate(){
        let token = localStorage.getItem('token');
        if(token && token != 'null'){
            return false;
        }
        return true;
    }

}