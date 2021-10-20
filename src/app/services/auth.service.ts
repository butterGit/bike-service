import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData!: any;

  constructor(private fireAuth: AngularFireAuth) { }

  login(user: User) {
    return this.fireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => this.userData = userCredential.user);
  }

  register(user: User) {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
  }

  logout() {
    return this.fireAuth.signOut();
  }

  //fix
  isLoggedIn() {
    return true;
  }

}
