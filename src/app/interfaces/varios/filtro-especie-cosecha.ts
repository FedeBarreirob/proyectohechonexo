import { Especie } from "./especie";
import { Cosecha } from "./cosecha";

export interface FiltroEspecieCosecha {
    especies?: Array<Especie>,
    cosechas?: Array<Cosecha>
}