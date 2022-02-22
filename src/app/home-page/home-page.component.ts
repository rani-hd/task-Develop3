
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  user_id: string = '';
  allBlogs: any = [];

  constructor(
    public router: Router,
    private auth: AuthService,
    private dialogRef: MatDialog,
    public coreURL: BackendService
  ) {}

  openDialog() {
    // this.attribute =  localStorage.getItem("names")
    this.user_id = this.auth.getUserId();
    console.log('this.user_id',this.user_id)
    if (this.user_id) {
      this.router.navigate(['blog-page']);
    } else {
      const dialogRef = this.dialogRef.open(PopUpComponent, {
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.user_id = this.auth.getUserId();

        // localStorage.setgetItem( username ,this.userData.username);
        console.log(localStorage.getItem('names'));
        if (this.user_id) {
          this.isUserLogged = true
          this.router.navigate(['blog-page']);
        }
      });
    }
  }
  openDialogProfile() {
    this.user_id = this.auth.getUserId();
    if (this.user_id) {
      this.router.navigate(['profile']);
    } else {
      const dialogRef = this.dialogRef.open(PopUpComponent, {
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.user_id = this.auth.getUserId();
        if (this.user_id) {
          this.isUserLogged = true
          this.router.navigate(['profile']);
        }
      });
    }
  }
  logout() {
    window.localStorage.clear();
    this.user_id = '';
    this.auth.setUserId('');
    this.isUserLogged = false
  }

  isUserLogged=false;
  ngOnInit(): void {
    const storedUser:any = localStorage.getItem('userId');
    const user = JSON.parse(storedUser)
    if(user){
      this.auth.setUserId(user);
      this.user_id = user
      this.isUserLogged = true
    }
    this.initUser();
  }
  initUser() {
    let blogcheck = this.coreURL.getData().subscribe((snapshot) => {
      blogcheck.unsubscribe();
      //console.log(snapshot);
      const data: any = [];
      let key: any = {};
      for (key of snapshot) {
        if(key.status === 'active'){
          data.push(key);
          console.log(key);
        }
      }
      this.allBlogs = data;
    });
  }
  goToPage(route: string) {
    this.router.navigate([route]);
  }
}