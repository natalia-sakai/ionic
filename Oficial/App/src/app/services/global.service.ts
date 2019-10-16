import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public access: any;
  constructor(private storage:Storage) {
    this.storage.get('access').then((value)=>{
      this.access = value;
    })
   }
}
