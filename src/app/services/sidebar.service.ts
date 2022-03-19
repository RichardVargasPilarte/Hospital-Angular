import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    { 
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'Progress' },
        { titulo: 'Gráficas', url: 'Gráfica1' },
        { titulo: 'Promesas', url: 'Promesas' },
        { titulo: 'Rxjs', url: 'Rxjs' },
      ]
    }
  ];

  constructor() { }
}
