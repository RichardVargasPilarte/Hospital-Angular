import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario!.nombre, Validators.required],
      email: [this.usuario!.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;

        Swal.fire('Guardado', 'Cambios guardados', 'success');
      }, (err) => {
        // console.log(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(event: any): void {
    this.imagenSubir = event.target.files[0];
    if (!this.imagenSubir) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir!);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario!.uid || '')
      .then((img) => {
        this.usuario!.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
    // window.location.reload()
  }
}
