import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "src/sdk/core/httpinterceptor.service";

import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
