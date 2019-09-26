import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { tap, catchError,retry } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Response } from 'selenium-webdriver/http';
import { Observable, of, throwError, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*pipe e tab são funções independentes do metodo Observable
  pipe cria uma cadeia de operadores
  tab executa os efeitos colaterais 
  */

  //variaveis
  a="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYzMzRmYzE3M2Y0MmRiY2VkMTZiM2JiMTkzZTRiNmU5NzM0OTk0NTRhMzUxN2I2YjUyY2MzNmVhNWQwOGM4OWM3YTBjMTIwN2NjMGVlNDQ0In0.eyJhdWQiOiIyIiwianRpIjoiZjMzNGZjMTczZjQyZGJjZWQxNmIzYmIxOTNlNGI2ZTk3MzQ5OTQ1NGEzNTE3YjZiNTJjYzM2ZWE1ZDA4Yzg5YzdhMGMxMjA3Y2MwZWU0NDQiLCJpYXQiOjE1Njk0MjE1MzEsIm5iZiI6MTU2OTQyMTUzMSwiZXhwIjoxNjAxMDQzOTMxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.p_qrIku98uVTyr9rd53Q762_cuIuVd268j1VPr5zvmaBmnXys1ZPnEMoqliblCb3RwucmSTr6KWcdrVH8v8ePM4Fb-IHF2ffQc4AAlvVuTYBoNkbNZr9c8m9TFwNaD3Dnnx_BJmoQHhw_WRo15wlG9gGeM2awRMjaDBacnIDgp04W4_6lQunjpAoTf__Xf2YeTwoARweYdXti3DoFaieijPlNT_fXGQnxmPa1w7_Cq9zvWse7wa1ZIMkXcCTm4W9LdJsezbPLWCvpKOI_-PzsUcItl5FFYq01Xz8KtEONNAR4JZz6YRF3T-LEYo2TF_9LlpwbyA5FguKFQLE35zIJtZMv2WEzR3JGGlwy9e-HIgRLW42msnAzwAZE4cGYdSx-YRVyXIpxybjVm4RY6QA9J27rteM7VnjvDEfjT4lCGhQyutUMBTRtKwtdXelWSJpDY7HZCoJUpEVLMR_GEijMjGJhBGFNHVnB1CxIt2HV2TAP1_RMQwNWJaRZ2E-RBRGir3RDsN4FSkRJbdS0-atsTJ3kzMtw2p1BiAG5CAW3kAbQcUn3z5CDLLKRz-XlAQmzPQw4WoIXf7IFYmHnzzbHPov7A7Ul_pSkWVgsLKpVTU4pghiN_3uH7fYEm0EzKy_wf1lPyF_DALnrMqI0cF4lXEpXwItjdqP0WQ--imxAcc";
  isLoggedIn = false;
  token:any;
  id:any;
  public date:any;
  public info:any
  public ordem:any;

  auxtoken: any;
  auxid: any;

  /* CRUD - creat, read, update, delete. Carregam valores armazenados */

  constructor(
    private http: HttpClient,
    private storagenative: NativeStorage,
    private env: EnvService
  ) { }
  
  /*
    -- oficial --
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
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
        return this.id;
      })
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }

  logout() {
    //token de acesso teste
    let headers = new HttpHeaders({
      'Authorization': this.a
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
    let headers = new HttpHeaders({
      'Authorization': this.a
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }
  
  updateuser(id: Number,fName: String, lName: String, email: String) {
    return this.http.put(this.env.API_URL + 'auth/updateuser',
      {id_user: id, fName: fName, lName: lName, email: email}
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
    let headers = new HttpHeaders({
      'Authorization': this.a
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
          //this.isLoggedIn=false;
          this.isLoggedIn=true; //teste
        }
      },
      error => {
        this.token = null;
        //this.isLoggedIn=false; //--> é esse
        this.isLoggedIn=true; //-->teste
      }
    );
  }

 getReuniao(): Observable<any> {
  let headers = new HttpHeaders({
    'Authorization': this.a
  });
  return this.http.get<any>( this.env.API_URL+'auth/getreuniao',{ headers: headers })
  .pipe(
  retry(1),
  catchError(this.handleError)
  ); 
 }

  confirma_presenca(id_user: Number, resp: Number)
  {
    return this.http.post(this.env.API_URL + 'auth/listapresenca',
      {id_user: id_user, presenca: resp}
    );
  }

  get_presenca(): Observable<any>
  {
    let headers = new HttpHeaders({
      'Authorization': this.a
    });
    return this.http.get<any>( this.env.API_URL+'auth/getlista',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    ); 
  }

  getinfo(): Observable<any>
  {
    //token de acesso teste
    let headers = new HttpHeaders({
      'Authorization': this.a
    });
    return this.http.get<any>( this.env.API_URL+'auth/getinfo',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    ); 
  }

  getordem(): Observable<any>
  {
     //token de acesso teste
     let headers = new HttpHeaders({
      'Authorization': this.a
    });
    return this.http.get<any>( this.env.API_URL+'auth/getordem',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    );  
  }
}