import { GlobalService } from './global.service';

import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { tap, catchError,retry } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Response } from 'selenium-webdriver/http';
import { Observable, of, throwError, Observer } from 'rxjs';
import { StringifyOptions } from 'querystring';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*pipe e tab são funções independentes do metodo Observable
  pipe cria uma cadeia de operadores
  tab executa os efeitos colaterais 
  */

  //variaveis
  isLoggedIn = false;
  public auxtoken:any;
  public token:any;
  public id:any;
  public date:any;
  public info:any
  public ordem:any;
  public endereco:any;
  public cidade:any;
  public estado:any;
  auxid: any;
  public aux: any;

  /* CRUD - creat, read, update, delete. Carregam valores armazenados */

  constructor(
    private http: HttpClient,
    private env: EnvService, 
    private alertctrl : AlertService, public storage : Storage,
    private global : GlobalService
  ) {
   }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage); 
  
  }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login', 
      {email: email, password: password}
    ).pipe(
      tap(access_token => {
        this.storage.set('token', access_token).then(
          (val) => {
            console.log('Token armazenado');
            this.auxtoken = val.accessToken;
            this.storage.set('access', this.auxtoken);
          },
          error => console.error('Erro ao armazenar o Token', error)
        );
        this.token = access_token;
        this.isLoggedIn = true;
        return this.token;
      })
    );
  }

  register(fName: String, lName: String, email: String, password: String,data_nasc: Date, cargo_id: Number, avental_id:Number, telefone: Number, endereco: String, cidade: String, estado: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
    {
      fName: fName, lName: lName, 
      email: email, password: password, 
      endereco: endereco, cidade: cidade, 
      estado: estado, data_nasc: data_nasc, 
      cargo_id: cargo_id, avental_id:avental_id, telefone:telefone
    }).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
      });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.isLoggedIn = false;
        this.storage.remove('access');
        this.storage.remove('token');
        delete this.token;
        delete this.global.access;
        return data;
      })
    )
  }

   user() {
    const headers = new HttpHeaders({
    'Authorization': "Bearer "+this.global.access
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }
  
  updateuser(id: Number,fName: String, lName: String, email: String, endereco: String, cidade: String, estado: String, data_nasc: String, telefone: Number) {
    return this.http.put(this.env.API_URL + 'auth/updateuser',
      {id_user: id, fName: fName, lName: lName, email: email, endereco: endereco, cidade: cidade, estado: estado,data_nasc: data_nasc, telefone: telefone}
    )
  }

  updatepassword(id: Number, password: String) {
    return this.http.put(this.env.API_URL + 'auth/updatepassword',
    {id_user: id, password: password}
    )
  }

  checkpassword(id: Number, password: String)
  {
    return this.http.post(this.env.API_URL + 'auth/checkpassword',
      {id_user: id, password: password}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  getId(): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
    });
    return this.http.get<any>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
          //this.isLoggedIn=true; //teste
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false; //--> é esse
        //this.isLoggedIn=true; //-->teste  
      }
    );
  }

  getReuniao(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
      });
    return this.http.get<any>( this.env.API_URL+'auth/getreuniao',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    ); 
  }

  confirma_presenca(id_user: Number, resp: Number, motivo: String)
  {
    return this.http.post(this.env.API_URL + 'auth/listapresenca',
      {id_user: id_user, presenca: resp, motivo: motivo}
    );
  }

  getLista(): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
      });
    return this.http.get<any>( this.env.API_URL+'auth/getlista',{ headers: headers }); 
  }

  getInfo(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getinfo');
  }

  getOrdem(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getordem');  
  }

  getCargos()
  {
    return this.http.get<any>( this.env.API_URL+'auth/getcargos').pipe(
      retry(1),
      catchError(this.handleError)
      ); 
  }
}