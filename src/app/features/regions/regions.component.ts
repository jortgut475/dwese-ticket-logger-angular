<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core'; 
import { CommonModule } from '@angular/common';   
import { RegionService } from '../../core/services/region.service'; 
import { Router } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<any>([]);
  
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private regionService: RegionService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchRegions(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe((sort: Sort) => this.handleSortEvent(sort));
  }

  fetchRegions(page: number, size: number, sortColumn: string, sortDirection: string) {
    this.regionService.fetchRegions(page, size, sortColumn, sortDirection).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
        this.pageSize = res.size;

        setTimeout(() => {
          this.paginator.length = this.totalElements;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.pageSize = this.pageSize;
        });
      },
      error: (err) => {
        if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        } else {
          this.error = 'Error al cargar las regiones';
        }
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.fetchRegions(event.pageIndex, event.pageSize, this.sortColumn, this.sortDirection);
  }

  handleSortEvent(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction || 'asc';
    this.fetchRegions(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection);
  }
}
=======
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
>>>>>>> af2e84d53eb7c9910ee79b72556d292593294f9b
