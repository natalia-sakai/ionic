import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

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
  token:any;
  id:any;
  date:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login', 
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token armazenado');
          },
          error => console.error('Erro ao armazenar o Token', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
      tap(id =>{
        this.storage.setItem('id', JSON.stringify(this.id))
        .then(
          () => {
            console.log('ID armazenado');
          },
          error => console.error('Erro ao armazenar o ID', error)
        );

        this.id = id;
        return id;
      })
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  
  getId()
  {
   return this.storage.getItem('id').then(
    data => {
      this.id = data;
      return this.id;
    },
    error => {
      console.log(error);
    }
   )
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        //this.isLoggedIn=false; //--> é esse
        this.isLoggedIn=true; 
      }
    );
  }

  getReuniao(){
    //return this.http.get(this.env.API_URL+'auth/getreuniao');
  }

  confirma_presenca(id_user: Number, resp: Number)
  {
    return this.http.post(this.env.API_URL + 'auth/listapresenca',
      {id_user: id_user, presenca: resp}
    );
  }

}