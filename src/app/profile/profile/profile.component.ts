import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: any = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
      //  console.log("userForm details"+this.userForm.username);
    this.initProfile();
  }
  initProfile() {
    let logUser = this.auth.getUser().subscribe((data) => {
      logUser.unsubscribe();
      let user: any = {};
     // console.log(Response);
      const user_id = this.auth.getUserId();
      for (user of data) {
        if (user.username === user_id) {
          this.userForm.setValue(user);
          //console.log(user);
        }
      }
    });
  }

  updateProfile(form:FormGroup) {
    this.auth.updateUser(form.value).then((data) => {
      this.router.navigate(['home-page']);
    });
  }
}
