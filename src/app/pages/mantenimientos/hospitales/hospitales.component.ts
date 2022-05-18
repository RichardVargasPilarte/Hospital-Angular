import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino).subscribe((resultados) => {
      this.hospitales = resultados as Hospital[];
      // console.log(resp);
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospitales(hospital._id!, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
      });
  }

  Borrar(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar lo',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospitales(hospital._id!).subscribe((resp) => {
          this.cargarHospitales();
          Swal.fire('Hospital Borrrado', hospital.nombre, 'success');
        });
      }
    });
    
  }

  async abrirSweetAlertModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospitales(value!).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
        // Swal.fire('Hospital Creado',value,'success');
        // console.log(resp);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img
    );
  }
}
