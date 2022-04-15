import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppData } from './shared/services/app-data.service';
import { GlobalErrorHandler } from './shared/services/error-handler';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { NetworkInterceptor } from './shared/interceptor/network.interceptor';
import { ApiRequestService } from './shared/services/api-request.service';
import { ToastService } from './shared/services/toast.service';
import { StorageService } from './core/services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from './shared/component/loader/loader.module';
import { ImageService } from './shared/services/cache-image.service';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { FcmMessagingService } from './shared/services/fcm-messaging.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    LoaderModule,
    FormsModule
  ],
  providers: [
    AppData,
    Network,

    AppVersion,
    FcmMessagingService,
    CallNumber, AndroidPermissions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },
    { provide: FCM },
    ApiRequestService,
    ToastService,
    StorageService,
    ImageService,
    FCM, StatusBar,
    SplashScreen,
    FirebaseAnalytics,
    LocalNotifications,
    OpenNativeSettings

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
