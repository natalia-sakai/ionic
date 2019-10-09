import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem',
  templateUrl: './ordem.page.html',
  styleUrls: ['./ordem.page.scss'],
})
export class OrdemPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.showordem();
  }

  public ordem: any;
  
  async showordem() {
    await this.authService.getOrdem().subscribe(
      data=>{
        this.ordem = data;
        this.handleordem();
    },
    error=>{
      console.log(error);
    });
  }

  handleordem()
  {
    this.ordem;
  }
}
