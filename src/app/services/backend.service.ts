import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private db: AngularFirestore) {}

  addData(data: any) {
    const id = this.db.createId();
    const blogsRef = this.db.collection('blogs');
    return blogsRef.doc(id).set({ id: id, ...data });
  }

  updateData(data: any) {
    const id = data.id;
    const blogsRef = this.db.collection('blogs');
    blogsRef.doc(id).set({ ...data });
  }

  getData() {
    return this.db.collection('blogs').valueChanges();
  }
}
