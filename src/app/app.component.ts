import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "src/sdk/core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import * as decode from "jwt-decode";


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
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

  ) {
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
