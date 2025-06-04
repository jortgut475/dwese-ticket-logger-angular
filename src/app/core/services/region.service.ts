import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environments";

/**
 * Servicio para gestionar las regiones, incluyendo la obtención de datos paginados y autenticación con token.
 */

@Injectable({
  providedIn: 'root',   //Permite que el servicio este disponible en toda la aplicación sin necesidad de declararlo en un módulo.
})

export class RegionService{
  /**
   * Constructor del Servicio
   * @param http Cliente HTTP de Angular para realizar solicitudes a la API.
   * @param AuthService Servicio de auntenticación para obtener el token de acceso.
   */
  constructor(private http: HttpClient,private authService:AuthService){}

  /**
   * Obtiene la lista de regiones desde la API con Ordenación y paginación.
   * 
   * @param page Número de la página a solicitar (comienza en 0).
   * @param size Número de elementos por página.
   * @param sortColum Nombre de la columna por lo cual se ordenanán los resultados.
   * @param sortDirection Dirección de ordenación (`asc` para ascendente, `desc` para descendente).
   * @returns Observable que emite la respuesta paginada de la API con las regiones solicitadas.
   */
  fetchRegions(page:number,size:number,sortColum:string,sortDirection:string): Observable<any>{
    //Obtener el token de autenticación desde el servicio de autenticación
    const token=this.authService.getToken();

    //Si el usuario no esta autenticado, lanzar un mensaje de error 
    if(!token){
      return throwError(()=>new Error('Unauthorized'));
    }

    //Contrucción de los parámetros de la solicitud HTTP
    const params=new HttpParams()
      .set('page',page.toString())  //Página solicitada
      .set('size',size.toString())  //Cantidad de elementos por páginas
      .set('sort',`${sortColum},${sortDirection}`);   //Parámetro de ordenación en formato "columna,direccion"
    
    //Realizar la solicitud GET a la API con auntenticación y parámetros de página y ordenación
    return this.http.get(`${environment.apiUrl}/regions`,{
      headers:new HttpHeaders({ Authorization: `Bearer ${token}`}), //Encabezado con el token de auntenticación
      params:params //Parámetros de paginación y ordenación
    });
  }
}
