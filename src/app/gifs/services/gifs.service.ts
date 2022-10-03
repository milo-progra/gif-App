import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey      : string    = '2dK46rX4hdBe3BWdQxXnO5eDS42IaS4a'
  private servicioUrl : string    = 'https://api.giphy.com/v1/gifs'
  private _historial  : string[]  = [];

  public resultados   : Gif[]     = [];

  get historial(){
    return [...this._historial];
  }


  constructor( private http: HttpClient){

    localStorage.getItem('historial');
    if( localStorage.getItem('historial') ){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    //mostrar la ultima busqueda en pantalla
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


  }




// Agregamos un elemento al arreglo _historial
  buscarGifs( query: string){
    
    //Eliminamos los espacios en blanco y transformamos en minusculas
    query = query.trim().toLocaleLowerCase();

    //Si el nuevo elemento a ingresar no existe en el arreglo 
    if(!this._historial.includes( query )){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) )
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    console.log(params.toString());
          

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params} )
        // el .subscribe() es muy parecido al .then() se ejecutara al tener la resolucion del get     
        .subscribe( (resp) => {
          console.log(resp.data);
          this.resultados = resp.data;
          //mostrar la ultima busqueda en pantalla
          localStorage.setItem('resultados', JSON.stringify( this.resultados ))
        });
  }


  
}
