import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { SummaryComponent } from './summary/summary';
import { ReportsComponent } from './reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'reports', component: ReportsComponent }
];
