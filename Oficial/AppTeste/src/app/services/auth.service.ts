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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  
  getId(): Observable<any>
  {
    //token de acesso teste
    let headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
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
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
    });
    return this.http.get<any>( this.env.API_URL+'auth/getlista',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    ); 
  }

  getinfo()
  {
    //token de acesso teste
    let headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
    });
    
   return new Promise ((resolve)=>{
     this.http.get(this.env.API_URL+'auth/getinfo',{ headers: headers }).subscribe((result:any)=>{
      this.info = result; //ta recebendo certo
      console.log(this.info);
      return this.date;
    },
    (error)=>{
      console.log(error);
    });
   });
  }

  getordem(): Observable<any>
  {
     //token de acesso teste
     let headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZjVjY2MzOTgyYWU2NTA5MmQ2YWY5OTMyZGM4MWQ0ZWJjZWRmNDBmOTVkZjAxZDEyNGZiZmU2NjFkOWZhMjY1M2Y1Yzk2YmMwMzgzY2YzIn0.eyJhdWQiOiIyIiwianRpIjoiZGRmNWNjYzM5ODJhZTY1MDkyZDZhZjk5MzJkYzgxZDRlYmNlZGY0MGY5NWRmMDFkMTI0ZmJmZTY2MWQ5ZmEyNjUzZjVjOTZiYzAzODNjZjMiLCJpYXQiOjE1NjkyNDcwMzMsIm5iZiI6MTU2OTI0NzAzMywiZXhwIjoxNjAwODY5NDMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3HhwFiPkU_9tvwBW2mPeIqmiypJIyrNWpGgaA5XP3NqGy4hUJa2aqtan7RhtYfMMI_JZPjzPFKlhVXJgBpTbbWrV--Fa9ttRkydZClPl3yamMqkp9BZBMRJtj5q3h8bLHzvrPO0R96u-yWtVLr7F8m6OfQeACHNjXbDzK74EwKlcjjnQiR8GgGiH17VG0vyHnudm5G1DiSKf6SsHxb917qeM4jLgx1_8-vzh-ZZa0bI3hEZa2waLDOpcZX6CMaGwyWpb5baar2aTVmMMN_JDdPCGFpuF9eDL4p6HNsb-OI1ZpZKONOHA0pN6YQSljXTmk0FiUdTEkFW7klhgAz2U6xRUxR_sO84w8weIloh4f84uGAEVy1rGsiQEQHHNfsorq2-CzZ1eluW9w-BYyuyoqeEhk-vgF8iBSBN_SM6lGDz94aBjOh_XDlZjMuIDobD11Ba9N48mSoJ_JUmfcpCTw0maxFI20Lz_i-_pjmQXEsT_yzXc6ZRgtCUL3Yn9i7K16za_aEgbSC6Cget7aa6bZYGgHy4UpGwwxJIUIAdxGbDMpsv5epiTVBPsliGm6qkTFmZlV_aFxJaJmzwsGcAJnnNCWvGGJ0vcWwOJbCqasUziC7Gk7NR7Xyl1kTj7XcvBOp1jBT9rFLYeuj4Ujr8xKOjw-3fbqu1fSeVaDU0JsfY'
    });
    return this.http.get<any>( this.env.API_URL+'auth/getordem',{ headers: headers })
    .pipe(
    retry(1),
    catchError(this.handleError)
    );  
  }
}