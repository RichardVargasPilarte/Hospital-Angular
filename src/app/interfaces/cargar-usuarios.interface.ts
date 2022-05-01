import { Usuario } from "../models/usuario.model";

export interface cargarUsuarios {
  total: number;
    usuarios: Usuario[];
}