import { StackScreenProps } from "@react-navigation/stack";
import { Automata } from "#types/Automata";

export type BibliotecaNavigationStackParamList = {
	Biblioteca: undefined;
	VerAutomata: { indiceAutomata: number };
	DatosIniciales: undefined;
	DefinirTransiciones: { automata: Automata };
	EditarDatosIniciales: { indiceAutomata: number, automata: Automata };
	EditarTransiciones: { indiceAutomata: number, automata: Automata };
};
