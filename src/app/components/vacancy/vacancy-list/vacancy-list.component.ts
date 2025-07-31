import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApiDataService } from '../../../services/api-data.service';

export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  status: string;
  dateCreated: Date;
}

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.scss']
})
export class VacancyListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'company', 'location', 'status', 'dateCreated', 'actions'];
  dataSource = new MatTableDataSource<Vacancy>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiDataService: ApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVacancies();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadVacancies(): void {
    this.apiDataService.queryGet<Vacancy[]>('vacancies').subscribe({
      next: (vacancies) => {
        this.dataSource.data = vacancies;
      },
      error: (error) => {
        console.error('Error loading vacancies:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editVacancy(vacancy: Vacancy): void {
    this.router.navigate(['/add-vacancy'], { queryParams: { id: vacancy.id } });
  }

  deleteVacancy(vacancy: Vacancy): void {
    if (confirm(`Are you sure you want to delete ${vacancy.title}?`)) {
      this.apiDataService.queryDelete(`vacancies/${vacancy.id}`).subscribe({
        next: () => {
          this.loadVacancies();
        },
        error: (error) => {
          console.error('Error deleting vacancy:', error);
        }
      });
    }
  }

  addNewVacancy(): void {
    this.router.navigate(['/add-vacancy']);
  }
}
