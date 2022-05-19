import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu() {
    // this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];

    if (this.menu.length === 0) {
      
    }
  }

  // menu: any[] = [
  //   { 
  //     titulo: 'Principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'Progress' },
  //       { titulo: 'Gráficas', url: 'Gráfica1' },
  //       { titulo: 'Promesas', url: 'Promesas' },
  //       { titulo: 'Rxjs', url: 'Rxjs' },
  //     ]
  //   },
  //   { 
  //     titulo: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'Usuarios' },
  //       { titulo: 'Hospitales', url: 'Hospitales' },
  //       { titulo: 'Médicos', url: 'Medicos' }
  //     ]
  //   }
  // ];

}
