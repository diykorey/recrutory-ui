import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToVacancies(): void {
    this.router.navigate(['/vacancies']);
  }

  navigateToCandidates(): void {
    this.router.navigate(['/candidates']);
  }

  navigateToAddVacancy(): void {
    this.router.navigate(['/add-vacancy']);
  }

  navigateToAddCandidate(): void {
    this.router.navigate(['/add-candidate']);
  }
}
