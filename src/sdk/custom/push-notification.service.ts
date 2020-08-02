import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const SERVER_URL = "http://localhost:3000/api/subscribe";

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log("sending to server", subscription);

    return this.http.post(SERVER_URL, subscription);
  }
}
