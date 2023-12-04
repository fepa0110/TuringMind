import { StackScreenProps } from "@react-navigation/stack";
import { Automata } from "../../types/Automata";

export type BibliotecaNavigationStackParamList = {
    Biblioteca: undefined;
    VerAutomata: { automata: Automata };
  };
