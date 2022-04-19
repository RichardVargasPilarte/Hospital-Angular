import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  public registerForm = this.fb.group(
    {
      nombre: ['Richard', Validators.required],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['1234567', Validators.required],
      confirmPassword: ['1234567', Validators.required],
      terminos: [true, Validators.requiredTrue],
    },
    {
      validators: this.passwordIguales('password', 'confirmPassword'),
    } as AbstractControlOptions
  );

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar posteo si el formulario es valido
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        // redireccionar al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        // console.warn(err.error.msg);
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (!this.registerForm.get(campo)?.valid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass = this.registerForm.get('password')?.value;
    const confirmPass = this.registerForm.get('confirmPassword')?.value;

    if (pass !== confirmPass && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    if (!this.registerForm.get('terminos')?.valid && this.formSubmitted) {
      return true;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
