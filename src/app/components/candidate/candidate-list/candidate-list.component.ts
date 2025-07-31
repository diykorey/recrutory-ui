import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApiDataService } from '../../../services/api-data.service';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  dateAdded: Date;
}

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'position', 'status', 'dateAdded', 'actions'];
  dataSource = new MatTableDataSource<Candidate>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiDataService: ApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCandidates(): void {
    this.apiDataService.queryGet<Candidate[]>('candidates').subscribe({
      next: (candidates) => {
        this.dataSource.data = candidates;
      },
      error: (error) => {
        console.error('Error loading candidates:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCandidate(candidate: Candidate): void {
    this.router.navigate(['/add-candidate'], { queryParams: { id: candidate.id } });
  }

  deleteCandidate(candidate: Candidate): void {
    if (confirm(`Are you sure you want to delete ${candidate.name}?`)) {
      this.apiDataService.queryDelete(`candidates/${candidate.id}`).subscribe({
        next: () => {
          this.loadCandidates();
        },
        error: (error) => {
          console.error('Error deleting candidate:', error);
        }
      });
    }
  }

  addNewCandidate(): void {
    this.router.navigate(['/add-candidate']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'new': return 'primary';
      case 'screening': return 'accent';
      case 'interview': return 'warn';
      case 'hired': return 'primary';
      case 'rejected': return '';
      default: return '';
    }
  }
}
