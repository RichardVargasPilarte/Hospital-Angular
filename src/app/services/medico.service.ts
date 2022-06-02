import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarMedicos(): Observable<Medico[]> {
    const url = `${base_url}/medicos`;
    return this.http
      .get<{ ok: boolean; medicos: Medico[] }>(url, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos));
  }

  obtenerMedicoPorId(id: string) {
    // const url = `${base_url}/medicos/${id}`;
    // return this.http
    //   .get<{ ok: boolean; medico: Medico }>(url, {
    //     headers: {
    //       'x-token': this.token,
    //     },
    //   })
    //   .pipe(
    //     map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
    //   );

    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers).pipe(map((resp: any) => resp.medico));
  }

  crearMedicos(medico: { nombre: string; hospital: string }) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedicos(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  borrarMedicos(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
