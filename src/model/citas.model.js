import { randomUUID } from "crypto";
import { CitaSchema } from "../schema/citass-schema.js";
import { citas } from "../data/data.js";

export class Cita {
  static async agregarCita(datos) {
    const citaValidada = CitaSchema.parse(datos);
    const nuevaCita = { id: randomUUID(), ...citaValidada };
    citas.push(nuevaCita);
    return nuevaCita;
  }

  static async obtenerTodasLasCitas() {
    return citas;
  }

  static async obtenerCitaPorId(id) {
    const cita = citas.find((c) => c.id === id);
    return cita ?? null;
  }

  static async eliminarCita(id) {
    if (!id) return null;

    const citaIndex = citas.findIndex((c) => c.id === id);
    if (citaIndex === -1) return null;

    const [citaEliminada] = citas.splice(citaIndex, 1);
    return citaEliminada;
  }

  static async actualizarCita(id, datos) {
    if (!id) return null;

    const citaIndex = citas.findIndex((c) => c.id === id);
    if (citaIndex === -1) return null;

    citas[citaIndex] = { ...citas[citaIndex], ...datos };
    return citas[citaIndex];
  }
}
