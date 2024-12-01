import { Estado } from "./Estado";

export interface Automata{
    nombre: String;
    borrador?: Boolean;
    estados: Estado[];
}