import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/sdk/core/auth.service";
import { Router } from "@angular/router";
import { BooksService } from "src/sdk/custom/books.service";
import * as decode from "jwt-decode";
import { Storage } from "@ionic/storage";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { AddnewbookComponent } from "../addnewbook/addnewbook.component";
import { Socket } from "ngx-socket-io";
@Component({
  selector: "app-mybooks",
  templateUrl: "./mybooks.page.html",
  styleUrls: ["./mybooks.page.scss"],
})
export class MybooksPage implements OnInit {
  loading = false;
  deleteLoading = false;
  books: Books[] = [];
  selectedBook: Books;
  dataa: any;
  newdata: Books[];

  message = "";
  messages = [];
  currentUser = "";
  constructor(
    private authService: AuthService,
    private router: Router,
    private booksService: BooksService,
    private storage: Storage,
    private alertController: AlertController,
    private modalController: ModalController,
    private socket: Socket,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const token = this.storage.get("token");
    console.log("got", token);
    if (token) {
      console.log("if");

      this.socket.connect();
      let name = `user-${new Date().getTime()}`;
      this.currentUser = name;
      this.socket.emit("set-name", name);
      this.socket.fromEvent("users-changed").subscribe((data) => {
        let user = data["user"];
        if (data["event"] === "left") {
          this.showToast("User left: " + user);
        } else {
          this.showToast("User joined: " + user);
          console.log(user);
        }
      });
      this.socket.fromEvent("message").subscribe((message) => {
        this.messages.push(message);
      });

      this.socket.on("status", (next) => {
        console.log("status", next);
      });
    }
  }
  sendMessage() {
    const owner = "accepted";
    console.log("sent");
    this.socket.emit("send-message", owner);
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000,
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.getBooksByUserId();
  }

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
        console.log("error block", this.dataa);
        this.newdata = localData;
        this.loading = false;
        console.log("error", error);
      }
    );
  }
  onInput() {
    const searchbar = (<HTMLInputElement>(
      document.getElementById("ion-searchbar")
    )).value;
    this.newdata = this.dataa.filter((item) => {
      return item.name.toLowerCase().indexOf(searchbar.toLowerCase()) > -1;
    });
  }

  async openAddModal(book?: Books) {
    const modal = await this.modalController.create({
      component: AddnewbookComponent,
      componentProps: { book },
    });
    modal.onDidDismiss().then((data) => {
      //  this.getAll();
      this.getBooksByUserId();
    });
    return await modal.present();
  }
  openEditPopup(book: Books) {
    this.openAddModal(book);
  }

  async delete(book) {
    this.selectedBook = book;
    const alert = await this.alertController.create({
      header: `Delete"${book.name}"?`,
      message: `Are you sure you want to delete the "${book.name}"`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Cancel");
          },
        },
        {
          text: "Delete",
          handler: () => {
            this.deleteBook();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteBook() {
    this.deleteLoading = true;

    const observable = await this.booksService.deleteBook(
      this.selectedBook._id
    );
    observable.subscribe(
      (data) => {
        console.log("got response from server", data);
        this.deleteLoading = false;
        //this.getAll();
        this.getBooksByUserId();
      },
      async (error) => {
        this.deleteLoading = false;
        const alert = await this.alertController.create({
          header: "No internet service available!",
          message: "Please check your internet service.",
          buttons: ["Okay"],
        });

        await alert.present();
        console.log("error", error);
      }
    );
  }
}

interface Books {
  name: string;
  ibn: string;
  image_url: string;
  author: string;
  _id?: string;
  is_deleted: boolean;
}
