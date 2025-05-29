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
