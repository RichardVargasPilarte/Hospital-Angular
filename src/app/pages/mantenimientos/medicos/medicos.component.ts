import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService, 
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img) => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resultados) => {
      this.medicos = resultados as Medico[];
    });
  }
  
  Borrar(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar lo',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedicos(medico._id!).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire('Hospital Borrrado', medico.nombre, 'success');
        });
      }
    });
    
  }
}
