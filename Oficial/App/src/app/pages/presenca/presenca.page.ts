import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.page.html',
  styleUrls: ['./presenca.page.scss'],
})
export class PresencaPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.showlista();
  }
  public motivo: any;
  public nome: any;
  public presenca: any;
  public i:any;
  public lista: any[];
  public tamanho: any;
  async showlista() {
    await this.authService.getLista().subscribe(
      data=>{
        this.tamanho = data;
        for(let i=0; i<this.tamanho; i++)
        {
          this.motivo = data.motivo;
          console.log(this.motivo);
          if(data.presenca == 0)
            this.presenca = "Não estará presente";
          else
            this.presenca = "Estará presente";
          this.authService.user().subscribe(resul => {
            this.nome = resul.first_name + " " + resul.last_name;
            console.log(this.nome);
          }, error=>{
            console.log(error);
          });
        }
        this.handlelista();
    },
    error=>{
      console.log(error);
    });
  }

  handlelista()
  {
    this.lista;
    this.motivo;
    this.presenca;
    this.nome;
  }
}
