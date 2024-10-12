import { StackScreenProps } from "@react-navigation/stack";
import { Automata } from "#types/Automata";

export type CrearAutomataNavigationStackParamList = {
    DatosIniciales: undefined;
    DefinirTransiciones: { automata: Automata };
  };
