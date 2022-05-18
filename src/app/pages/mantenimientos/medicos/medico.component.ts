import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;
  public medicoSeleccionado: Medico | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      // console.log(id);
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hosp) => hosp._id === hospitalId
      );
    });
  }

  // cargarMedico(_id: string) {
  //   if (_id === 'Nuevo') {
  //     return;
  //   }

  //   this.medicoService
  //     .obtenerMedicoPorId(_id)
  //     .pipe(delay(100))
  //     .subscribe((medico) => {
  //       if (!medico) {
  //         return this.router.navigateByUrl(`/Dashboard/Medicos/`);
  //       }

  //       const {
  //         nombre,
  //         hospital: { _id },
  //       } = medico;
  //       this.medicoSeleccionado = medico;
  //       this.medicoForm.setValue({ nombre, hospital: _id });
  //     });
  // }

  cargarMedico( id: string ) {
 
    if ( id === 'Nuevo') {
      return // no carga el medico (no existe) si estamos creando un médico
    }
    this.medicoService.obtenerMedicoPorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( medico => {
            const { nombre, hospital: { _id } } = medico
            this.medicoSeleccionado = medico
            this.medicoForm.setValue( { nombre: nombre, hospital: _id} )
        }, error => {
          return this.router.navigateByUrl(`/Dashboard/Medicos`);
        })
}

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedicos(data).subscribe((resp) => {
        console.log(resp);
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      this.medicoService
        .crearMedicos(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/Dashboard/Medico/${resp.medico._id}`);
        });
    }
  }
}
