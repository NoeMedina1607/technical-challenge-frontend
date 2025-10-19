import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CompanyService } from '../../core/services/company.service';
import { ICompanyResponse } from '../../core/interfaces/company.interface';
import { filter, finalize, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { EditCompanyDialogComponent } from '../../shared/edit-company/edit-company.component';

@Component({
  standalone: true,
  selector: 'app-company-management',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ConfirmDialogComponent
  ],
  templateUrl: './company-management.component.html',
  styleUrl: './company-management.component.scss'
})
export class CompanyManagementComponent implements AfterViewInit {
  private _companyService = inject(CompanyService);
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);

  public displayedColumns = ['rnc', 'name', 'tradeName', 'status', 'actions'];
  public dataSource = new MatTableDataSource<ICompanyResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getCompanies();
  }

  getCompanies() {
    this._companyService.getCompanies().subscribe({
      next: (response: ICompanyResponse[]) => {
        this.dataSource.data = response;
      },
      error: () => {
        this._snackBar.open('Error al cargar', 'OK', { duration: 2500 });
      }
    });
  }

  filterCompanies(evt: Event) {
    const value = (evt.target as HTMLInputElement).value?.trim().toLowerCase() || '';
    this.dataSource.filter = value;
  }

  clearCompaniesFilter() { this.dataSource.filter = ''; }

  editCompany(company: ICompanyResponse) {
    this._dialog.open(EditCompanyDialogComponent, {
      width: '760px',
      data: { company }
    })
    .afterClosed()
    .pipe(filter(Boolean))
    .subscribe(() => this.getCompanies());
  }

  deleteCompany(company: ICompanyResponse) {
    this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar empresa',
        message: `¿Seguro que quieres eliminar la empresa ${company.name}?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this._companyService.deleteCompany(company.id)),
        finalize(() => this.getCompanies())
      )
      .subscribe({
        next: () => {
          this._snackBar.open('Eliminado', 'OK', { duration: 1500 })
        },
        error: () => {
          this._snackBar.open('No se pudo eliminar', 'OK', { duration: 2000 })
        }
      });
  }
}
