import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  /*
  A API feita agr interage com o APP
  */
  constructor(private http : HttpClient) { }

  obterUsuarioPorId(id : number){
    let url = 'http://localhost:17901/api/usuario/' + id;
    // toPromise pede a requisição
    return this.http.get(url).toPromise();
  }

  excluirPorId(id : number){
    let url = 'http://localhost:17901/api/usuario/' + id;

    return this.http.delete(url).toPromise();
  }
  
  adicionar(usuario : any){
    let url = 'http://localhost:17901/api/usuario/';
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    
    return this.http.post(url, usuario, {headers : headers}).toPromise();
  }

  atualizar(usuario : any){
    let url = 'http://localhost:17901/api/usuario/';
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.put(url, usuario, {headers : headers}).toPromise();
  }
}

