import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

// Modulos externos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AccoutnSettingsComponent } from './accoutn-settings/accoutn-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccoutnSettingsComponent,
    PromesasComponent,
    RjxsComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccoutnSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
