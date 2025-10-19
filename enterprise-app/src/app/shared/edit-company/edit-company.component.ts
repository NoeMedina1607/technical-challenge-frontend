import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EditCompanyData } from '../../core/types/edit-company';
import { CompanyService } from '../../core/services/company.service';

@Component({
  standalone: true,
  selector: 'app-edit-company-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
  <h2 mat-dialog-title>Editar empresa</h2>

  <div mat-dialog-content class="content">
    <form [formGroup]="form" class="grid">
      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>RNC</mat-label>
        <input matInput formControlName="rnc" readonly class="readonly">
        <mat-hint>Campo no editable</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Nombre de la empresa *</mat-label>
        <input matInput formControlName="name" required>
        <mat-error *ngIf="form.get('name')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Nombre comercial *</mat-label>
        <input matInput formControlName="tradeName" required>
        <mat-error *ngIf="form.get('tradeName')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Categoría</mat-label>
        <input matInput formControlName="category" placeholder="Opcional">
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Esquema de pago *</mat-label>
        <input matInput formControlName="paymentScheme" placeholder="Opcional">
        <mat-error *ngIf="form.get('paymentScheme')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Estado *</mat-label>
        <input matInput formControlName="status" placeholder="Opcional">
        <mat-error *ngIf="form.get('status')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Actividad económica *</mat-label>
        <input matInput formControlName="economicActivity" required>
        <mat-error *ngIf="form.get('economicActivity')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" subscriptSizing="dynamic" class="col-2">
        <mat-label>Rama gubernamental *</mat-label>
        <input matInput formControlName="governmentBranch" required>
        <mat-error *ngIf="form.get('governmentBranch')?.hasError('required')">Obligatorio</mat-error>
      </mat-form-field>
    </form>
  </div>

  <div mat-dialog-actions align="end">
    <button mat-button (click)="ref.close()">Cancelar</button>
    <button mat-flat-button color="primary"
            [disabled]="form.invalid || saving()" (click)="save()">Guardar</button>
  </div>
  `,
  styles: [`
    .content { padding-top: 4px; }
    .grid {
      display: grid; gap: 14px; grid-template-columns: 1fr;
    }
    @media (min-width: 760px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1140px) { .grid { grid-template-columns: repeat(3, 1fr); } }
    .col-1 { grid-column: span 1; }
    .col-2 { grid-column: span 2; }
    .readonly { user-select: text; }
  `]
})
export class EditCompanyDialogComponent {
  private _formBuilder = inject(FormBuilder);
  public _companyService = inject(CompanyService);

  public form: FormGroup;
  public saving = signal(false);

  constructor(
    public ref: MatDialogRef<EditCompanyDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: EditCompanyData
  ) {
    this.form = this._formBuilder.group({
      rnc: [{ value: data.company.identification, disabled: true }],
      name: [data.company.name, [Validators.required]],
      tradeName: [data.company.comercialName, [Validators.required]],
      category: [data.company.category ?? ''],
      paymentScheme: [data.company.paymentScheme, [Validators.required]],
      status: [data.company.status, [Validators.required]],
      economicActivity: [data.company.economicActivity, [Validators.required]],
      governmentBranch: [data.company.governmentBranch, [Validators.required]],
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving.set(true);
    const payload = this.form.getRawValue();
    const { name, tradeName, category, paymentScheme, status, economicActivity, governmentBranch } = payload;
    this._companyService.updateCompany(this.data.company.id, {
      name,
      tradeName,
      category: category ?? '',
      paymentScheme,
      status,
      economicActivity,
      governmentBranch
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.ref.close(true);
      }, error: () => {
        this.saving.set(false);
      }
    });
  }
}
