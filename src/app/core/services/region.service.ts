<<<<<<< HEAD
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../enviroments/environments';

/**
 * Servicio para gestionar las regiones, incluyendo la obtención de datos paginados y autenticación con token.
 */
@Injectable({
  providedIn: 'root', // Permite que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en un módulo.
})
export class RegionService {
  /**
   * Constructor del Servicio
   * @param http Cliente HTTP de Angular para realizar solicitudes a la API.
   * @param authService Servicio de autenticación para obtener el token de acceso.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtiene la lista de regiones desde la API con ordenación y paginación.
   * 
   * @param page Número de la página a solicitar (comienza en 0).
   * @param size Número de elementos por página.
   * @param sortColumn Nombre de la columna para ordenar los resultados.
   * @param sortDirection Dirección de ordenación (`asc` para ascendente, `desc` para descendente).
   * @returns Observable que emite la respuesta paginada de la API con las regiones solicitadas.
   */
  fetchRegions(page: number, size: number, sortColumn: string, sortDirection: string): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Unauthorized'));
    }

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortColumn},${sortDirection}`);

    return this.http.get(`${environment.apiUrl}/regions`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
      params: params,
    });
  }
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './../../../enviroments/environments';


@Injectable({
 providedIn: 'root'
})
export class RegionService {


 constructor(private http: HttpClient, private authService: AuthService) { }


 /**
  * Método para obtener las regiones desde la API.
  * @returns Observable que emite la lista de regiones.
  */
 fetchRegions(): Observable<any> {
   const token = this.authService.getToken(); // Obtén el token del AuthService


   if (!token) {
     // Si no hay token, lanza un error indicando que el usuario no está autorizado.
     return throwError(() => new Error('Unauthorized'));
   }


   // Realiza la solicitud GET al endpoint de regiones con el token en el encabezado.
   return this.http.get(`${environment.apiUrl}/regions`, {
     headers: new HttpHeaders({
       Authorization: `Bearer ${token}`,
     }),
   });
 }
>>>>>>> af2e84d53eb7c9910ee79b72556d292593294f9b
}
