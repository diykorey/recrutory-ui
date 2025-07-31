import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VacancyListComponent } from './components/vacancy/vacancy-list/vacancy-list.component';
import { VacancyDashboardComponent } from './components/vacancy/vacancy-dashboard/vacancy-dashboard.component';
import { AddVacancyComponent } from './components/vacancy/add-vacancy/add-vacancy.component';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { CandidateDashboardComponent } from './components/candidate/candidate-dashboard/candidate-dashboard.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vacancies', component: VacancyListComponent },
  { path: 'vacancy-dashboard', component: VacancyDashboardComponent },
  { path: 'add-vacancy', component: AddVacancyComponent },
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidate-dashboard', component: CandidateDashboardComponent },
  { path: 'add-candidate', component: AddCandidateComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
