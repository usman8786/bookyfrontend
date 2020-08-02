import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "src/sdk/core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import * as decode from "jwt-decode";
import { PushNotificationService } from "src/sdk/custom/push-notification.service";
import { SwPush } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY =
    "BA_mhe3cSJ3kG41wWPOYNlC_yWcaOP2-WSfbX2qdntLT48lNyLzYGF942ar7rSf-6wX15CzwlKAs4yzRh331xJ0";
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home",
    },
    {
      title: "Products",
      url: "/mybooks",
      icon: "book",
    },
    {
      title: "Logout",
      icon: "power",
    },
  ];
  loggedIn: boolean;
  name: any;
  ibn: any;
  subscription: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {
    ////////////////////////////////////
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then((subscription) => {
          this.pushService
            .sendSubscriptionToTheServer(subscription)
            .subscribe();
        })
        .catch(console.error);
    }
    ///////////////////////
    this.initializeApp();
    this.setToken();
    route.queryParams.subscribe((params) => {
      if (params.login) {
        this.setToken();
      }
    });
  }

  ionViewWillEnter() {
    this.setToken();
  }

  logout() {
    this.authService.logout();
    this.setToken();
    this.router.navigate(["/home"], { queryParams: { logout: true } });
  }

  getUserName() {
    this.storage.get("token").then((res) => {
      const decodedToken = decode(res);
      const username = decodedToken.data.name;
      this.name = username;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setToken() {
    const token = this.storage.get("token").then((token) => {
      if (token) {
        this.loggedIn = true;
        this.getUserName();
      } else {
        this.loggedIn = false;
      }
    });
  }
}
