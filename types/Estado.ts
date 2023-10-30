import { Transicion } from './Transicion'

export interface Estado{
    nombre: number;
    transiciones: Transicion[];
}