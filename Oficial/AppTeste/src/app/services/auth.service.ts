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
  a="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVjNDkzYjhmM2I0ZjE4ODVhY2VlOTNjY2QwODMxODkyYWIwNWU0ODZhZDM1NTk2M2QzZmM1ZWJmY2UwMzJiMmRhMTgxNTU2ZWVlM2FjOTEyIn0.eyJhdWQiOiIyIiwianRpIjoiNWM0OTNiOGYzYjRmMTg4NWFjZWU5M2NjZDA4MzE4OTJhYjA1ZTQ4NmFkMzU1OTYzZDNmYzVlYmZjZTAzMmIyZGExODE1NTZlZWUzYWM5MTIiLCJpYXQiOjE1Njk1MTU0NjgsIm5iZiI6MTU2OTUxNTQ2OCwiZXhwIjoxNjAxMTM3ODY4LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.otkEbkF7QavXOxu2h8V0TcQ605TbdtyWhEyvDF5GfyH8jXOti_tp74Hf4TW_-wfVDuGO7fE_Bszpe1MPE0TEQ0QTm3CAUZtifoX4gLy4ELtcRJZrocBG9EN3oGv0iYTsQi_6-hL6jP88acc-42kJ0I0AuKndx-4P7afvZu5cYJv0Em05crX4Wy-y_uDDKnT0QXuwJ9SDtTeEADJu353E88hH-n6hL_xQp2ENDcuA-OTuMrfNVALPJbrUhTcBSIM8iAUKXAlxKUVarbULi3QKpicahnIKbjm53TxdO30i5t03ESlK8-jll-sP_GeQgFBIJRkQ7T7ez35on3lnDgLw4z8aVR9BICMYxHZcIGsXwtpWkNdkHFRblkQFRhq5Ek9kUfUvEWhiE0T44EVCNFWSCgAcsmHBB2GZ0FMlBGaZJgPQ3gSTDLAvyZHsPx-rHDccMDZbiFkk2v141Gjue_6QtaOMOD_YNOX0QzLsdRDduHNxPBD7CRnWzcTuNxxvWVVD-3iezZPM8XOqznbAsEwUOd4muXG0bYVr8zbh7bNs0zNSnFrOcXzMksWIIs3s4olKoC3IQv9NqKeB5NFp52832YxI9DmEpDrW46CUoGrh8-cwr9AOmiGPviQKiIn6sv0_noVt77hrBPBZdGIuXyY0aEZ9Lx9JuVcOSAD1JObH_bw";
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

  register(fName: String, lName: String, email: String, password: String, type: Number) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password, type: type}
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

  confirma_presenca(id_user: Number, resp: Number, motivo: String)
  {
    return this.http.post(this.env.API_URL + 'auth/listapresenca',
      {id_user: id_user, presenca: resp, motivo: motivo}
    );
  }

  get_presenca(): Observable<any>
  {
    let headers = new HttpHeaders({
      'Authorization': this.a
    });
    return this.http.get<any>( this.env.API_URL+'auth/getlista',{ headers: headers }); 
  }

  getinfo(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getinfo');
  }

  getordem(): Observable<any>
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