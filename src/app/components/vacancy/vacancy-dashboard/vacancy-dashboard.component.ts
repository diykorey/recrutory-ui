import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../services/api-data.service';

export interface VacancyStats {
  totalVacancies: number;
  activeVacancies: number;
  closedVacancies: number;
  recentVacancies: any[];
}

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.scss']
})
export class VacancyDashboardComponent implements OnInit {
  stats: VacancyStats = {
    totalVacancies: 0,
    activeVacancies: 0,
    closedVacancies: 0,
    recentVacancies: []
  };

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.apiDataService.queryGet<VacancyStats>('vacancies/dashboard').subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading vacancy dashboard data:', error);
      }
    });
  }
}
