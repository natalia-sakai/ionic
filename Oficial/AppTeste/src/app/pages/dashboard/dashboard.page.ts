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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  id:any;
  data_r:any;
  opcao: Number;
  public disabled=true;//desabilitado
  public havedata = false;
  texts: any[] = [];
  reuniao:Reuniao = {id: null, data: '', ativo: 0};

  ordem: any[] = [];

  constructor(private navCtrl:NavController, private authService: AuthService, private alertService: AlertService,private http: HttpClient,private env: EnvService, private route: ActivatedRoute) { 
  }
  ngOnInit() {
    this.showdata();
  }
  //verifica se o usuario ja respondeu
  verifica(){ 
    this.authService.get_presenca().subscribe(
      resp => {
        //verifica se esta vazio, se tiver permite q o usuario escolha a opcao
        if(JSON.stringify(resp)=="{}")
        {
          this.disabled = false;
        }
        else
        {
          this.disabled = true;
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
    this.authService.getId()
      .subscribe(
      data=>{ 
        this.id = data.id;
        //manda pra funcão o id do usuario e a resposta, se ja tiver no bd ele atualiza para uma nova resposta
        this.authService.confirma_presenca(this.id, resp ).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.alertService.presentToast('Confirmação enviada!');
          }
        );
      }
      , error=>{ 
        console.log('nao entrou');
        console.log("error: " + error);
      });
      this.verifica();
  }

  editar()
  {
    this.disabled = false;
  }

  showordem()
  {
    this.authService.getordem()
    .subscribe(
      data =>{
      this.ordem = data;
      }, 
      error=>{
        console.log(error);
      }
    );
  }
}