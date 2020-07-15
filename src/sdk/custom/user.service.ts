import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BookyConfig } from "../booky.config";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  public userLogin(credentials: object): Observable<any> {
    // this url will be the http://localhost:3000/users/login
    const url = BookyConfig.getPath() + "/users/login";
    return this.http.post(url, credentials);
  }
  public sendEmail(credentials: object): Observable<any> {
    // this url will be the http://localhost:3000/users/login
    const url = BookyConfig.getPath() + "/users/send_email";
    return this.http.post(url, credentials);
  }
  public sendCode(credentials: object): Observable<any> {
    // this url will be the http://localhost:3000/users/login
    const url = BookyConfig.getPath() + "/users/verifycode";
    return this.http.post(url, credentials);
  }
  public userRegister(credentials: object): Observable<any> {
    // this url will be the http://localhost:3000/users/register
    const url = BookyConfig.getPath() + "/users/register";
    return this.http.post(url, credentials);
  }
}
