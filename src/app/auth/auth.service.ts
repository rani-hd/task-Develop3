import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from 'firebase/auth';
import { from} from 'rxjs';

@Injectable({
  providedIn: 'root',
}) 
export class AuthService {
  isLoggedIn=false
  constructor(public db: AngularFirestore,
    public afg : AngularFireAuth) {}
  isAuthenticated: boolean = false;
  user_Id: string = '';

  setUserId(id: string) {
    this.user_Id = id;
    this.isAuthenticated = true;
  }
  getUserId() {
    return this.user_Id || '';
  }
  // login(email: string, password: string) {
  // return from(this.afg.signInWithEmailAndPassword(email, password));
  // }
//  signp(email:string,password:string){
//    //this.afg.createUserWithEmailAndPassword(email,password)
//  }
 logout(){
   this.afg.signOut()
   this.db.collectionGroup

 }
 async signUp(data: any) {
  const id = this.db.createId();
  const usersRef = this.db.collection('users');
  await this.afg.createUserWithEmailAndPassword(data.email,data.password)
  .then(res=>{ this.isLoggedIn=true})
  return usersRef.doc(id).set({ id: id, ...data });
}
async logIn(data: any): Promise<void> {
  const id = this.db.createId();
  const usersRef = this.db.collection('users');
  await this.afg.signInWithEmailAndPassword(data.email,data.password)
  .then(res=>{ this.isLoggedIn=true})
  return usersRef.doc(id).set({ id: id, ...data });
}
  updateUser(data: any) {
    const usersRef = this.db.collection('users');
    return usersRef.doc(data.id).set(data);
  }
  getUser() {
    return this.db.collection('users').valueChanges();
  } 
  getAuthStatus() {
    return this.isAuthenticated;
  }
}
