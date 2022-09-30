import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "src/sdk/core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import * as decode from "jwt-decode";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";


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
      title: "Account",
      url: "/myaccount",
      icon: "settings",
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
  email:any;
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
    private fcm: FCM

  ) {
    this.initializeApp();
    this.setToken();
    this.getUserName()
    route.queryParams.subscribe((params) => {
      if (params.login) {
        this.setToken();
      }
    });
  }

  ionViewWillEnter() {
    // this.setToken();
    this.getUserName()

  }

  logout() {
    this.authService.logout();
    this.setToken();
    this.router.navigate(["/home"], { queryParams: { logout: true } });
  }

  getUserName() {
    this.storage.get("name").then((name) => {
      this.name = name;
    });
  }

  initializeApp() {
    this.getUserName()

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();  
        // get FCM token
        this.fcm.getToken().then(token => {
          console.log(token);
        });
  
        // ionic push notification example
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
            console.log('Received in foreground');
          }
        });      
  
        // refresh the FCM token
        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
        });
  
      });
    } else {
      console.log("browser");
      
      // You're testing in browser, do nothing or mock the plugins' behaviour.
      //
      // var url: string = 'assets/mock-images/image.jpg';
    }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');

      // get FCM token
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });      

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      // unsubscribe from a topic
      // this.fcm.unsubscribeFromTopic('offers');

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
