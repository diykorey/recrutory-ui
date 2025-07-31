import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiDataService } from '../../../services/api-data.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  isEditMode = false;
  candidateId: number | null = null;

  statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'screening', label: 'Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiDataService: ApiDataService,
    private snackBar: MatSnackBar
  ) {
    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      position: ['', [Validators.required]],
      experience: [''],
      skills: [''],
      notes: [''],
      status: ['new', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.candidateId = +params['id'];
        this.loadCandidate(this.candidateId);
      }
    });
  }

  loadCandidate(id: number): void {
    this.apiDataService.queryGet(`candidates/${id}`).subscribe({
      next: (candidate: any) => {
        this.candidateForm.patchValue(candidate);
      },
      error: (error) => {
        console.error('Error loading candidate:', error);
        this.snackBar.open('Error loading candidate', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const candidateData = this.candidateForm.value;

      if (this.isEditMode && this.candidateId) {
        this.updateCandidate(this.candidateId, candidateData);
      } else {
        this.createCandidate(candidateData);
      }
    }
  }

  createCandidate(candidateData: any): void {
    this.apiDataService.queryPost('candidates', candidateData).subscribe({
      next: () => {
        this.snackBar.open('Candidate created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/candidates']);
      },
      error: (error) => {
        console.error('Error creating candidate:', error);
        this.snackBar.open('Error creating candidate', 'Close', { duration: 3000 });
      }
    });
  }

  updateCandidate(id: number, candidateData: any): void {
    this.apiDataService.queryPut(`candidates/${id}`, candidateData).subscribe({
      next: () => {
        this.snackBar.open('Candidate updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/candidates']);
      },
      error: (error) => {
        console.error('Error updating candidate:', error);
        this.snackBar.open('Error updating candidate', 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/candidates']);
  }
}
