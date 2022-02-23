
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import * as bcrypt from 'bcryptjs';
import { where } from 'firebase/firestore';
const salt = bcrypt.genSaltSync(10);
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})

export class PopUpComponent implements OnInit {
  userData: any = {};
  isLogin: boolean = true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private afg: AngularFireAuth,
    public dialogRef: MatDialogRef<PopUpComponent>
  ) {}

  ngOnInit(): void {}
  
  login() {
    // this.dialogRef.close();
      
      let logUser = this.auth.getUser().subscribe((data) => {
      logUser.unsubscribe();
     
      let flag = false;
      let user: any = {};
      for (user of data) {
        if (
          this.userData.username === user.username &&
          this.userData.password === user.password
        ) {
          flag = true;
          this.auth.setUserId(this.userData.username);
          localStorage.setItem('userId',JSON.stringify(this.userData.username))
          this.userData = {};
          this.dialogRef.close();
          console.log(user);
         
          user.username=bcrypt.hash(this.userData.username, salt);
          user.password=bcrypt.hash(this.userData.password, salt);
          console.log(user);
          // this.router.navigate(['home-page']);
        }
      }

      if (flag === false) {
        console.log('Error: User not found');
        this.isLogin = false;
         this.router.navigate(['signup']);
      }
    });
  }

  signUp() {
    this.auth.signUp(this.userData).then((data) => {
      this.userData = {};
      this.isLogin = true;
      console.log('this.user_id',this.userData.user_id);  
      //  this.router.navigate(['login'])
    });
  }
  

  createNewAccout() {
    this.isLogin = false;
  }

  goBackToLogin() {
    this.isLogin = true;
  }
}