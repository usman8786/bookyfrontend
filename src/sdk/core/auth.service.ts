import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  logout() {
    this.storage.remove("token");
  }

  constructor(private storage: Storage) {}

  public async saveTokenToStorage(token: string) {
    return await this.storage.set("token", token);
  }

  public async getTokenFromStorage() {
    return await this.storage.get("token");
  }
  public async saveBookToStorage(book) {
    return await this.storage.set("book", book);
  }

  public async getBookFromStorage() {
    return await this.storage.get("book");
  }
}
