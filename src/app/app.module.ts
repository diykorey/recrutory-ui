import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import migrated components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VacancyListComponent } from './components/vacancy/vacancy-list/vacancy-list.component';
import { VacancyDashboardComponent } from './components/vacancy/vacancy-dashboard/vacancy-dashboard.component';
import { AddVacancyComponent } from './components/vacancy/add-vacancy/add-vacancy.component';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { CandidateDashboardComponent } from './components/candidate/candidate-dashboard/candidate-dashboard.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';

// Services
import { ApiDataService } from './services/api-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VacancyListComponent,
    VacancyDashboardComponent,
    AddVacancyComponent,
    CandidateListComponent,
    CandidateDashboardComponent,
    AddCandidateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,

    // Angular Material modules
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
