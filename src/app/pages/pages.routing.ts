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
import { AdminGuard } from '../guards/admin.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Manteinimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

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
      },
      {
        path: 'busqueda/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Busquedas' },
      },

      // Mantenimientos
      { 
        path: 'Hospitales', 
        component: HospitalesComponent, 
        data: { titulo: 'Hospitales' } 
      },
      { 
        path: 'Medicos', 
        component: MedicosComponent, 
        data: { titulo: 'Medicos' } 
      },
      { 
        path: 'Medico/:id', 
        component: MedicoComponent, 
        data: { titulo: 'Medico' } 
      },
      { 
        // ruta de admin
        path: 'Usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent, 
        data: { titulo: 'Usuarios' } 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
