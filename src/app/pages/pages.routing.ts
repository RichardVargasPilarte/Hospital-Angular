import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccoutnSettingsComponent } from './accoutn-settings/accoutn-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'Progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'Gráfica1',
        component: Grafica1Component,
        data: { titulo: 'Gráfica1' },
      },
      {
        path: 'account-settings',
        component: AccoutnSettingsComponent,
        data: { titulo: 'Account-settings' },
      },
      {
        path: 'Promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { 
        path: 'Rxjs', 
        component: RjxsComponent, 
        data: { titulo: 'Rxjs' } 
      },
      { 
        path: 'Perfil', 
        component: PerfilComponent, 
        data: { titulo: 'Perfil de usuario' } 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
