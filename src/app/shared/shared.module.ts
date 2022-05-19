import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
  exports: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
