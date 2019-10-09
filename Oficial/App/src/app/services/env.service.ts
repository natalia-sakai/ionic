import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //esse servico serve apenas para colocar a url da api pq chama varias vezes
  //nome da url da api --  verificar certinho a porta pq pode mudar quando 
  //API_URL = 'http://10.0.2.2:8000/api/'; //-->para emulador
  API_URL = 'http://localhost:8000/api/'; //-->para pc
  constructor() { }
}