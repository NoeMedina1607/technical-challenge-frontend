import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
      { path: 'companies/new', loadComponent: () => import('./modules/company-creation/company-creation.component').then(m => m.CompanyCreationComponent) },
      { path: 'companies/manage', loadComponent: () => import('./modules/company-management/company-management.component').then(m => m.CompanyManagementComponent) },
      { path: '**', redirectTo: '' }
    ]
  }
];
