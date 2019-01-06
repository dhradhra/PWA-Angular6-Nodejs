

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    getDropdownItems() {
        return this.http.get('http://localhost:3000/users/api/getDropdownItems');
    }

    addPushSubscriber(sub:any) {
        return this.http.post('http://localhost:3000/users/api/notifications', sub);
    }

    send() {
        return this.http.post('http://localhost:3000/users/api/newsletter', null);
    }

}


