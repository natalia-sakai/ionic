import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { tap, catchError,retry } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Response } from 'selenium-webdriver/http';
import { Observable, of, throwError, Observer } from 'rxjs';
import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*pipe e tab são funções independentes do metodo Observable
  pipe cria uma cadeia de operadores
  tab executa os efeitos colaterais 
  */

  //variaveis
  a="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA5NjE0NjgxODdiZGJkNTg1OTJlYmYyMWRjZTI5ZTgwM2RmMzg4Mzk1Y2QwNzRlOWM5ZjQ1MTMwYTBkZWI3OTQ4ZjJlNTE2YzJhMjI0NTQyIn0.eyJhdWQiOiIyIiwianRpIjoiMDk2MTQ2ODE4N2JkYmQ1ODU5MmViZjIxZGNlMjllODAzZGYzODgzOTVjZDA3NGU5YzlmNDUxMzBhMGRlYjc5NDhmMmU1MTZjMmEyMjQ1NDIiLCJpYXQiOjE1Njk5NDU0ODgsIm5iZiI6MTU2OTk0NTQ4OCwiZXhwIjoxNjAxNTY3ODg3LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.xT5GuolQm-B-W_3u6XfQpdS7cObPaXC2ZAsC8g74xHtT7Q388QkZd_USe0JbqWxmqxW5niqdnhWbPbnxxsDTdZT8rwPGz614LEQRI31Ry1g3qbfBSUjSwDAXD6q6z9iXGtAI4Dl7rodGNGrDFSWg_R6HC_Cy2y6s91cyc50hf_TX3b4bQXm7c7iK4fgxN-9RckA2-_RVU2X151p7CgPvKZABmyFa70c4G_vlz9UiRW17EoHZ_nH5EwW9zl4XWnPYlO6OuuYetEAc2CGAvf7IyuAUAzv-jdu9zR8s1DATx3VUviAYUiaFSrlGtG2xvqnBJpRpmGjZ33yJW4xL88dPi5lHvwQv69SfPeSuuvStq35PwXRGzifVwS5gjsMLqMGQhGDa67h9ZtRC5WnXKiWvtFnoG78Go7d0QvinM3zHBP7aFMZaGMiJ2ls6lc85RxXOrtGV984GkG0C3Gke1kTg7ie949j3V6x237-95Tk00divzE9la4VJahpnjvV_gYaruPJ8J3heUy5a7msxpYzhMYJ6RF0hOPbH1WGpHxP4HRPCmJNfFOnRALWneXWP9l-gktKPzi0j56Jt6ZYga4XqPtM8o5FD6E7BpsDb_GLlJAaLC-hJx2g_QrsXgkm3FAPbUeklSbm9YT9hhxj5TEw6Su5M3LQyUO8NGlF4ItsBowU";
  isLoggedIn = false;
  public token:any;
  public id:any;
  public date:any;
  public info:any
  public ordem:any;
  public endereco:any;
  public cidade:any;
  public estado:any;
  auxtoken: any;
  auxid: any;

  /* CRUD - creat, read, update, delete. Carregam valores armazenados */

  constructor(
    private http: HttpClient,
    private storagenative: NativeStorage,
    private env: EnvService, 
    private alertctrl : AlertService
  ) { }
  
  /*
    -- oficial --
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    */

   /* this.native.setItem('nome', dado);
      this.native.getItem('nome').then(
        data=>{

        }
      )
   */

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
        this.storagenative.setItem('token', access_token)
        .then(
          () => {
            console.log('Token armazenado');
          },
          error => console.error('Erro ao armazenar o Token', error)
        );
        this.token = access_token;
        this.isLoggedIn = true;
        console.log('access_token informations');
        console.log(access_token);
        console.log(this.token);
        console.log(access_token);

        console.log(this.token["access_token"]);
        this.handletoken();
        return access_token;
      }),
      tap(id =>{
        this.storagenative.setItem('id', id)
        .then(
          () => {
            console.log('ID armazenado');
          },
          error => console.error('Erro ao armazenar o ID', error)
        );
        this.id = JSON.stringify(id);
        console.log('id');
        console.log(id);
        console.log(this.id);
        return this.id;
      })
    );
  }

  handletoken()
  {
    console.log('handletoken');
    console.log(this.token);
    console.log(this.token["token_type"]);
    console.log(this.token["access_token"]);
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
    //token de acesso teste
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storagenative.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    //token de acesso teste
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
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
    //token de acesso teste
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<any>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  getToken() {
    return this.storagenative.getItem('token').then(
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
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
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
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
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