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

  constructor(private navCtrl:NavController, private authService: AuthService, 
    private alertService: AlertService,private http: HttpClient,
    private env: EnvService, private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) { 
  }
  ngOnInit() {
    this.showdata();
    this.showordem();
    this.showinfo();
    this.verifica();
  }
  
  async verifica(){ 
    //verifica se o usuario ja respondeu
    await this.authService.getLista().subscribe(
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
          }
          else if(JSON.stringify(resp.presenca) == '0')
          {
            this.p2 = "success";
            this.p1 = "primary";
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
        //se nao possui o id no banco de dados, deixa habilitado para o usuario
        this.disabled1=false;
        this.disabled2=false;
      }
    );
  }
  
  async showdata()
  {
    //mostra a data se tiver
    await this.authService.getReuniao()
    .subscribe(
    data=>{ 
      this.data_r = data;
      //se tiver reunião habilita
      if(this.data_r != null || this.data_r !== undefined)
      {
        this.havedata=true;
        this.verifica();
      }
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  async resposta(resp: Number)
  {
    this.opcao = resp;
    if(this.opcao == 0)
    {
      this.disabled3 = false;
      this.bmotivo(this.opcao);
    }
    else{
      this.motivo = "-";
      this.lista(this.opcao, this.motivo)
    }
    await this.verifica();
  }

  async bmotivo(opcao: Number)
  {
    //abre um pop
    let alertPrompt = await this.alertCtrl.create({
      header: 'Informe o motivo',
      inputs: [
        {
          name: 'motivo',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Enviar',
          handler: (data)=> {
            if(data.motivo == "")
              this.motivo = "Sem justificativa";
            else
              this.motivo = data.motivo;
            this.lista(this.opcao,this.motivo);
          }
        }
      ]
    });
    await alertPrompt.present();
  }

  async lista(opcao: Number, motivo: String)
  {
    await this.authService.getId()
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
      await this.verifica();
  }
  editar()
  {
    this.disabled1 = false;
    this.disabled2 = false;
  }

  async showordem()
  {
    await this.authService.getOrdem()
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
  
  async showinfo()
  {
    await this.authService.getInfo()
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