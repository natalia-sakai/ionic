
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informativo',
  templateUrl: './informativo.page.html',
  styleUrls: ['./informativo.page.scss'],
})
export class InformativoPage implements OnInit {

  constructor(public authService: AuthService) { }

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
