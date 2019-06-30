import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

import * as Parse from 'parse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: Parse.User;
  constructor(public router: Router) {

    Parse.initialize(environment.appId);  // use your appID & your js key
    (Parse as any).serverURL = environment.serverURL
  }
  login(email: string, password: string) {


    Parse.User.logIn(email, password).then((user) => {
      console.log("login " + user.id);
      this.currentUser = user;
      this.router.navigate(['admin']);
    }, (error) => {
      alert("Error ! " + error.message);
    });
  };



  logout() {
    
    Parse.User.logOut();
    this.router.navigate(['home']);
  }
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(`Parse/${environment.appId}/currentUser`));
    console.log(user);
    console.log(`Parse/${environment.appId}/currentUser`);
    return user !== null;
  }
}