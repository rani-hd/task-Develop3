import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css'],
})
export class BlogpageComponent implements OnInit {
  isAddblog: boolean = false;
  blogdata: string = '';
  allBlogs: any = [];
  user_id: string = '';
  blogStatus: string = 'inactive';
  togglestatus: boolean = false;

  constructor(
    public coreURL: BackendService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user_id = this.auth.getUserId();
    this.initUser();
  }

  initUser() {
    let blogcheck = this.coreURL.getData().subscribe((snapshot) => {
      blogcheck.unsubscribe();
      console.log(snapshot);
      const data: any = [];
      let key: any = {};
      for (key of snapshot) {
        if (key.user_id === this.user_id) {
          data.push(key);
        }
      }
      this.allBlogs = data;
    });
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }

  editCard(id: string) {
    const arr = [];
    for (let data of this.allBlogs) {
      if (data.id === id) {
        data.isEditable = true;
      }
      arr.push(data);
    }
    this.allBlogs = arr;
  }
  saveCard(id: string) {
    const arr = [];
    let editedData = [];
    for (let data of this.allBlogs) {
      if (data.id === id) {
        data.isEditable = false;
        editedData = data;
      }
      arr.push(data);
    }
    this.allBlogs = arr;
    this.coreURL.updateData(editedData);
  }
  createBlog() {
    debugger;
    const date = this.getDate();
    const data = {
      isActive:this.togglestatus,
      isEditable:false,
      created_at: date,
      updated_at: date,
      user_id: this.auth.getUserId(), //username
      content: this.blogdata,
      status: this.blogStatus,
    };
    this.coreURL.addData(data).then((res) => {
      this.isAddblog = false;
      this.blogdata = '';
      this.initUser();
    });
  }
  getDate() {
    const date = new Date();
    const newDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return newDate;
  }
  toggle() {
    if (this.togglestatus) {
      this.blogStatus = 'active';
    } else {
      this.blogStatus = 'inactive';
    }
  }

  toggleCard(id:string) {
    const arr = [];
    let editedData = [];
    for (let data of this.allBlogs) {
      if (data.id === id) {
        data.status = data.isActive?"active":"inactive";
        editedData = data;
      }
      arr.push(data);
    }
    this.allBlogs = arr;
    this.coreURL.updateData(editedData);
  }

}
