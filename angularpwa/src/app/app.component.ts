import { Component } from '@angular/core';
import { NewsletterService } from "./services/newsletter.service";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public onlineList 
   VAPID_PUBLIC_KEY = 'BMCs4gzye6J7zRnooWqa-cgHYdY62XAGqOZBgjBQyxp5KDtOCLIBAxV5sJqsBVf7tub2XmShxpMt5LGZvqVj5w0';
  lessons$: Observable<any[]>;
  isLoggedIn$: Observable<boolean>;
  updateAvailable : Boolean;
  sub: PushSubscription;


  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService, private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(() => {

      this.updateAvailable = true
    });
  }

  ngOnInit(){
    this.getList()
  }


  getList(){
    this.newsletterService.getDropdownItems().subscribe(
      (data) => this.onlineList = data['list'],
      err => console.log('Could not send subscription object to server, reason: ', err)
    );
  }
  
  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;


        console.log("Notification Subscription: ", sub);

        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }


  sendNewsletter() {


    console.log("Sending Newsletter to all Subscribers ...");

    this.newsletterService.send().subscribe();
  }
  title = 'Bytcode Technologies';
}
