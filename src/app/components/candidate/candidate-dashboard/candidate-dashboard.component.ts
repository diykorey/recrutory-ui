import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../services/api-data.service';

export interface CandidateStats {
  totalCandidates: number;
  activeCandidates: number;
  hiredCandidates: number;
  recentCandidates: any[];
}

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit {
  stats: CandidateStats = {
    totalCandidates: 0,
    activeCandidates: 0,
    hiredCandidates: 0,
    recentCandidates: []
  };

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.apiDataService.queryGet<CandidateStats>('candidates/dashboard').subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading candidate dashboard data:', error);
      }
    });
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
