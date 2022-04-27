import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public usuario?: Usuario;

  constructor( private usuarioService: UsuarioService) {
    // console.log(this.usuario);
    this.usuario = usuarioService.usuario;
    // console.log(this.usuario);
  }

  logout() {
    this.usuarioService.logout();
  }

}
