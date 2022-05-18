import { Hospital } from "../models/hospital.model";

export interface cargarHospitales {
    total: number;
    hospitales: Hospital[];
  }