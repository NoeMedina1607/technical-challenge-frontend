import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../core/services/company.service';
import { IDGIIResponse } from '../../core/interfaces/dgii.interface';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-company-creation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './company-creation.component.html',
  styleUrl: './company-creation.component.scss'
})
export class CompanyCreationComponent {
  private _formBuilder = inject(FormBuilder);
  private _companyService = inject(CompanyService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  public searching = signal(false);
  public saving = signal(false);

  public form = this._formBuilder.group({
    rnc: ['', Validators.required],
    name: ['', Validators.required],
    tradeName: ['', Validators.required],
    category: [''],
    paymentScheme: ['', Validators.required],
    status: ['', Validators.required],
    economicActivity: ['', Validators.required],
    governmentBranch: ['', Validators.required],
  });

  searchRnc() {
    if (this.form.controls.rnc.invalid) return;
    this.searching.set(true);

    this._companyService.getCompanyInformationFromDgii({ rnc: this.form.value.rnc! }).subscribe({
      next: (response: IDGIIResponse) => {
        const { companyName, tradeName, category, economicActivity, status, paymentScheme, governmentBranch } = response;
        this.form.patchValue({ name: companyName, tradeName, category, economicActivity, status, paymentScheme, governmentBranch });
        this.searching.set(false);
        this._snackBar.open('Datos obtenidos desde DGII', 'OK', { duration: 2000 });
      },
      error: _ => {
        this.searching.set(false);
        this._snackBar.open('No se encontró RNC en DGII', 'OK', { duration: 2500 });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    const { rnc, name, tradeName, category, paymentScheme, status, economicActivity, governmentBranch } = this.form.value;

    if(!rnc || !name || !tradeName || !paymentScheme || !status || !economicActivity || !governmentBranch) {
      this._snackBar.open('Todos los campos son necesarios', 'OK', { duration: 2500 });
      return;
    }

    this._companyService.createCompany({ identification: rnc, name, tradeName, category: category ?? '', paymentScheme, status, economicActivity, governmentBranch }).subscribe({
      next: () => {
        this.saving.set(false);
        this._snackBar.open('Empresa creada', 'OK', { duration: 2000 });
        this._router.navigate(['/companies/manage']);
      },
      error: (e: any) => {
        this.saving.set(false);
        this._snackBar.open('Error al guardar', 'OK', { duration: 2500 });
      }
    });
  }
}
