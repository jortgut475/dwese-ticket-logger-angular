import { Component, OnInit } from '@angular/core'; //Importa la utilidades necesarias para el componente
import { CommonModule } from '@angular/common';   //Importa commonModule para las directivas ngIf,ngFor.
import { RegionService } from '../../core/services/region.service'; //Importa el sevicio para obtener las regiones.
import { Router } from '@angular/router'; //Importa el Router para realizar la redirección.

@Component({
  selector: 'app-regions',  //Selector del componente
  imports: [CommonModule],  //Modulos necesarios para las funcionalidades comunes de Angular.
  templateUrl: './regions.component.html',  //Archivo de plantilla html asociado 
  styleUrls: ['./regions.component.scss'],    //Archivo de plantica scss asociado
})

export class RegionsComponent implements OnInit {
  regions: any[] = []; //Almacenas las regiones obtenidas del servicio
  error: string | null = null; //Almacena un mensaje de error si ocurre

  constructor(private regionService: RegionService, private router: Router) { }  //Inyecta el servicio RegionService y Router.
  ngOnInit() {
    //Llama al servicio para obtener las regiones mediante un observable.
    this.regionService.fetchRegions().subscribe({
      //Manejo exitoso de la respuesta:
      next: (res: any) => (this.regions = res.content),

      //Manejo de errores
      error: (err) => {
        if (err.status === 403) {
          //Si el error es 403,redirige al componente ForbidenComponent
          this.router.navigate(['/forbidden']);
        } else {
          //Si ocurre otro error, el mensaje sera generico
          this.error = 'An error ocurred';
        }
      },
    });
  }
}