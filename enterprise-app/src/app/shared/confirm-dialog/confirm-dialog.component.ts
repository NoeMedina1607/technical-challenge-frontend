import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ConfirmData } from '../../core/types/confirm-data';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>help</mat-icon>&nbsp;{{ data.title || 'Confirmar' }}
    </h2>

    <div mat-dialog-content class="content">
      {{ data.message }}
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="ref.close(false)">
        {{ data.cancelText || 'Cancelar' }}
      </button>
      <button mat-flat-button color="primary" (click)="ref.close(true)">
        {{ data.confirmText || 'Aceptar' }}
      </button>
    </div>
  `,
  styles: [`
    .content { padding-top: 4px; }
    h2 mat-icon { vertical-align: middle; opacity: .8; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public ref: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData
  ) {}
}
