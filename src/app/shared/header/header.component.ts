import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public usuario?: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    // console.log(this.usuario);
    this.usuario = usuarioService.usuario;
    // console.log(this.usuario);
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      // this.router.navigateByUrl('/Dashboard');
      return;
    }

    this.router.navigateByUrl(`/Dashboard/busqueda/${termino}`);
  }
}
