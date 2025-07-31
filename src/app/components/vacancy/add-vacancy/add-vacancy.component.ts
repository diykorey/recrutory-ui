import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiDataService } from '../../../services/api-data.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.scss']
})
export class AddVacancyComponent implements OnInit {
  vacancyForm: FormGroup;
  isEditMode = false;
  vacancyId: number | null = null;

  statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiDataService: ApiDataService,
    private snackBar: MatSnackBar
  ) {
    this.vacancyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      requirements: [''],
      salary: [''],
      status: ['active', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.vacancyId = +params['id'];
        this.loadVacancy(this.vacancyId);
      }
    });
  }

  loadVacancy(id: number): void {
    this.apiDataService.queryGet(`vacancies/${id}`).subscribe({
      next: (vacancy: any) => {
        this.vacancyForm.patchValue(vacancy);
      },
      error: (error) => {
        console.error('Error loading vacancy:', error);
        this.snackBar.open('Error loading vacancy', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.vacancyForm.valid) {
      const vacancyData = this.vacancyForm.value;

      if (this.isEditMode && this.vacancyId) {
        this.updateVacancy(this.vacancyId, vacancyData);
      } else {
        this.createVacancy(vacancyData);
      }
    }
  }

  createVacancy(vacancyData: any): void {
    this.apiDataService.queryPost('vacancies', vacancyData).subscribe({
      next: () => {
        this.snackBar.open('Vacancy created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/vacancies']);
      },
      error: (error) => {
        console.error('Error creating vacancy:', error);
        this.snackBar.open('Error creating vacancy', 'Close', { duration: 3000 });
      }
    });
  }

  updateVacancy(id: number, vacancyData: any): void {
    this.apiDataService.queryPut(`vacancies/${id}`, vacancyData).subscribe({
      next: () => {
        this.snackBar.open('Vacancy updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/vacancies']);
      },
      error: (error) => {
        console.error('Error updating vacancy:', error);
        this.snackBar.open('Error updating vacancy', 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/vacancies']);
  }
}
