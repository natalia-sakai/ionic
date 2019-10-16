import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informativos',
  templateUrl: './informativos.page.html',
  styleUrls: ['./informativos.page.scss'],
})
export class InformativosPage implements OnInit {

  constructor(public authService: AuthService, public native: NativeStorage) { }

  ngOnInit() {
    this.showinfo();
  }
  public info: any[];
  async showinfo() {
    await this.authService.getInfo().subscribe(
      data=>{
        this.info = data;
        this.handleinfo();
    },
    error=>{
      console.log(error);
    });
  }

  handleinfo()
  {
    this.info;
  }
}
