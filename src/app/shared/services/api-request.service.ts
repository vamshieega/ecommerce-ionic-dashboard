import { LoaderService } from './loader.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_KEYS, RequestUrl } from "./request-url.service";
import { ToastService } from "./toast.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiRequestService {
  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastService,
    private loaderService: LoaderService
  ) { }

  get(url: URL_KEYS, query = "", headers?) {
    return new Promise((resolve, reject) => {
      const reqUrlOptions = RequestUrl.get(url);
      if (reqUrlOptions.showLoading) { this.loaderService.show(); }
      this.httpClient
        .get<Observable<any>>(reqUrlOptions.url + `${query}`, { observe: "response", headers })
        .subscribe(
          (response) => {
            resolve(this.handleResponse(response, reqUrlOptions));
          },
          (error) => {
            reject(error);
            this.loaderService.hide();
          }
        );
    });
  }

  post(url: URL_KEYS, body, headers?, query = "") {
    return new Promise((resolve, reject) => {
      const reqUrlOptions = RequestUrl.get(url);
      if (reqUrlOptions.showLoading) { this.loaderService.show(); }
      this.httpClient
        .post(reqUrlOptions.url + `${query}`, body, { observe: "response", headers })
        .subscribe(
          (response) => {
            resolve(this.handleResponse(response, reqUrlOptions));
          },
          (error) => {
            reject(error);
            this.loaderService.hide();
          }
        );
    });
  }

  put(url: URL_KEYS, query = "", body, headers?) {
    return new Promise((resolve, reject) => {
      const reqUrlOptions = RequestUrl.get(url);
      if (reqUrlOptions.showLoading) { this.loaderService.show(); }
      return this.httpClient
        .put(reqUrlOptions.url + `${query}`, body, { observe: "response", headers })
        .subscribe(
          (response) => {
            resolve(this.handleResponse(response, reqUrlOptions));
          },
          (error) => {
            reject(error);
            this.loaderService.hide();
          }
        );
    });
  }

  patch(url: URL_KEYS, query = "", body, headers?) {
    return new Promise((resolve, reject) => {
      const reqUrlOptions = RequestUrl.get(url);
      if (reqUrlOptions.showLoading) { this.loaderService.show(); }
      this.httpClient
        .patch(reqUrlOptions.url + `${query}`, body, {
          observe: "response",
          headers,
        })
        .subscribe(
          (response) => {
            resolve(this.handleResponse(response, reqUrlOptions));
          },
          (error) => {
            reject(error);
            this.loaderService.hide();
          }
        );
    });
  }

  delete(url: URL_KEYS, query = "", body?, headers?) {
    return new Promise((resolve, reject) => {
      const reqUrlOptions = RequestUrl.get(url);
      if (reqUrlOptions.showLoading) { this.loaderService.show(); };
      const options = { headers: headers, body: body };
      this.httpClient
        .delete(reqUrlOptions.url + `${query}`, options)
        .subscribe(
          (response) => {
            resolve(this.handleResponse(response, reqUrlOptions));
          },
          (error) => {
            reject(error);
            this.loaderService.hide();
          }
        );
    });
  }

  async handleResponse(response, reqUrlOptions) {

    if (Math.floor(response["status"] / 100) === 2 && reqUrlOptions.showMsg) {
      console.log("HttpResponse::event =", response, ";");
      await this.toasterService.presentToast(response["body"]["message"], "toast-success");
    } else {
      console.log("event =", response, ";");
    }
    if (reqUrlOptions.showLoading) {
      this.loaderService.hide();
    }
    return response;
  }
}
