import { Component } from "@angular/core";
import { AuthService } from "src/sdk/core/auth.service";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";
import { BooksService } from "src/sdk/custom/books.service";
import * as decode from "jwt-decode";
import { AlertController, Platform, ToastController } from "@ionic/angular";
// import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  loading = false;
  deleteLoading = false;
  books: Books[] = [];
  selectedBook: Books;
  loggedIn: boolean;
  dataa: any;
  newdata: any;
  department: any;
  designation: any;
  subscription: any;

  message = "";
  messages = [];
  currentUser = "";
  owner: String;
  constructor(
    private authSerice: AuthService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private alertController: AlertController,
    private authService: AuthService,
    private platform: Platform // private socket: Socket, // private toastCtrl: ToastController
  ) {
    route.queryParams.subscribe((params) => {
      console.log("params", params);
      if (params.logout) {
        this.setToken();
        this.removeQueryParams();
      }
    });
  }

  removeQueryParams() {
    // Remove query params
    this.router.navigate([], {
      queryParams: {
        yourParamName: null,
        youCanRemoveMultiple: null,
      },
      queryParamsHandling: "merge",
    });
  }
  ionViewWillEnter() {
    this.setToken();
    this.getBooksByUserId();
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }
  // ionViewWillLeave() {
  //   this.subscription.unsubscribe();
  // }
  async getBooksByUserId() {
    this.books.length = 0;
    this.loading = true;

    const token = await this.storage.get("token");
    const decodedToken = decode(token);
    const id = decodedToken.data._id;

    const observable = await this.booksService.getBooksByUserId(id);
    observable.subscribe(
      (data) => {
        this.books = data.data;
        this.newdata = this.books;
        this.loading = false;
        this.dataa = data.data;
        this.authService.saveBookToStorage(this.dataa);
        console.log(this.dataa);
        this.authService.getBookFromStorage();
        console.log("got response from server", data);
      },
      async (error) => {
        var localData = await this.authService.getBookFromStorage();
        this.dataa = localData;
        this.newdata = localData;
        this.loading = false;
        this.loading = false;
      }
    );
  }

  async checkPrice(book, cprice) {
    const alert = await this.alertController.create({
      header: `${book}`,
      subHeader: "Cost price",
      message: `${cprice}`,
      buttons: ["Okay"],
    });

    await alert.present();
  }

  onInput() {
    const searchbar = (<HTMLInputElement>(
      document.getElementById("ion-searchbar")
    )).value;
    this.newdata = this.dataa.filter((item) => {
      return item.name.toLowerCase().indexOf(searchbar.toLowerCase()) > -1;
    });
  }
  getUserDepartment() {
    this.storage.get("token").then((res) => {
      const decodedToken = decode(res);
      const dept = decodedToken.data.department;
      this.department = dept;
    });
  }
  getUserDesignation() {
    this.storage.get("token").then((res) => {
      const decodedToken = decode(res);
      const des = decodedToken.data.designation;
      this.designation = des;
    });
  }

  setToken() {
    try {
      const token = this.storage.get("token").then((token) => {
        if (token) {
          this.loggedIn = true;
          this.getUserDepartment();
          this.getUserDesignation();
        } else {
          this.loggedIn = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------------------//

  // ngOnInit() {
  //   this.socket.connect();

  //   let name = `user-${new Date().getTime()}`;
  //   this.currentUser = name;

  //   this.socket.emit("set-name", name);

  //   this.socket.fromEvent("users-changed").subscribe((data) => {
  //     let user = data["user"];
  //     if (data["event"] === "left") {
  //       this.showToast("User left: " + user);
  //     } else {
  //       this.showToast("User joined: " + user);
  //       console.log(user);
  //     }
  //   });

  //   this.socket.fromEvent("message").subscribe((message) => {
  //     this.messages.push(message);
  //   });
  //   // console.log("hh", name);

  //   this.socket.on("owner", (owner) => {
  //     console.log("status", owner);
  //   });
  // }

  // sendMessage() {
  //   console.log("sent");
  //   this.socket.emit("send-message", this.owner);
  // }

  // ionViewWillLeave() {
  //   this.socket.disconnect();
  // }

  // async showToast(msg) {
  //   let toast = await this.toastCtrl.create({
  //     message: msg,
  //     position: "top",
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

  //--------------------------------------------//
}

interface Books {
  name: string;
  ibn: string;
  image_url: string;
  author: string;
  _id?: string;
  is_deleted: boolean;
}
