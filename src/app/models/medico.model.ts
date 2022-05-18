import { Hospital } from "./hospital.model";


interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public hospital?: Hospital,
        public usuario?: _MedicoUser,
    ) {}
}