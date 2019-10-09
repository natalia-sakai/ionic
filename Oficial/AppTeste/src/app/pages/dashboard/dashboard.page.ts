import { Reuniao } from './../../models/reuniao';
import { EnvService } from './../../services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';
import { count } from 'rxjs/operators';
import { getLocaleDayNames } from '@angular/common';
import { stringify } from 'querystring';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public id:any;
  public data_r:any;
  public opcao: Number;
  public p1="primary";
  public p2="danger";
  public disabled1=true;//desabilitado
  public disabled2=true;//desabilitado
  public disabled3=true;//desabilitado
  public havedata = false;
  public reuniao:Reuniao = {id: null, data: '', ativo: 0};
  public motivo: any;
  public ordem: any[] = [];
  public info: any[] = [];
  constructor(private navCtrl:NavController, private authService: AuthService, private alertService: AlertService,private http: HttpClient,private env: EnvService, private route: ActivatedRoute) { 
  }
  ngOnInit() {
    this.showdata();
    this.showordem();
    this.showinfo();
  }

  //mostrar qual o usuario tinha marcado!! -> disable only one button

  //verifica se o usuario ja respondeu
  async verifica(){ 
    this.authService.get_presenca().subscribe(
      resp => {
        //verifica se esta vazio, se tiver permite q o usuario escolha a opcao
        if(JSON.stringify(resp)=="{}")
        {
          this.disabled1 = false;
          this.disabled2 = false;
        }
        else
        {
          if(JSON.stringify(resp.presenca) == '1')
          {
            this.p1 = "success";
            this.p2 = "danger";
            this.disabled1 = true;
          }
          else if(JSON.stringify(resp.presenca) == '0')
          {
            this.p2 = "success";
            this.p1 = "primary";
            this.disabled2 = true;
          }
        }
        //se ja tiver algum motivo
        if(JSON.stringify(resp.motivo)!=null)
        {
          this.disabled3 = true;
        }
        else
        {
          this.disabled3 = false;
        }
          
      },
      error => {
        console.log(error);
      }
    );
  }
  //mostra a data se tiver
  async showdata()
  {
    this.authService.getReuniao()
    .subscribe(
    data=>{ 
      this.data_r = data;
      //se tiver reunião habilita
      if(this.data_r != null)
      {
        this.havedata=true;
        this.verifica();
      }
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  resposta(resp: Number)
  {
    this.opcao = resp;
  }

  bmotivo()
  {
    //abre um pop
    
  }

  lista()
  {
    this.authService.getId()
      .subscribe(
      data=>{ 
        this.id = data.id;
        //manda pra funcão o id do usuario e a resposta, se ja tiver no bd ele atualiza para uma nova resposta
        this.authService.confirma_presenca(this.id, this.opcao ,this.motivo).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.alertService.presentToast('Confirmação enviada!');
            this.verifica();
          }
        );
      }
      , error=>{ 
        console.log("error: " + error);
      });
      this.verifica();
  }
  editar()
  {
    this.disabled1 = false;
    this.disabled2 = false;
  }

  showordem()
  {
    this.authService.getordem()
    .subscribe(
      data =>{
        this.ordem = data;
        for(let i=0; i<data.length; i++){
          this.ordem[i];
        }
      }, 
      error=>{
        console.log(error);
      }
    );
  }
  
  showinfo()
  {
    this.authService.getinfo()
    .subscribe(
      data =>{
        this.info = data;
        for(let i=0; i<data.length; i++){
          this.info[i];
        }
      }, 
      error=>{
        console.log(error);
      }
    );
  }
}