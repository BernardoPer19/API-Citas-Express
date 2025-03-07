import { Cita } from "../model/citas.model.js";
import { CitaSchema } from "../schema/citass-schema.js";

export class CitaController {
  static async getData(req, res) {
    try {
      const result = await Cita.obtenerTodasLasCitas();
      return res.json(result);
    } catch (error) {
      console.error("Error obteniendo citas:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async addData(req, res) {
    try {
      const parsedData = CitaSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({
          error: "Datos inválidos",
          detalles: parsedData.error.errors,
        });
      }

      const result = await Cita.agregarCita(parsedData.data);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error agregando cita:", error);
      return res.status(500).json({
        error: "Error interno del servidor - No se pudo añadir la cita",
      });
    }
  }

  static async removeData(req, res) {
    try {
      const { id } = req.params;
      const result = await Cita.eliminarCita(id);
      res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        error: "Error interno del servidor - No se pudo eliminar la cita",
      });
    }
  }

  static async updateData(req, res) {
    try {
      const { id } = req.params;

      const parsedData = CitaSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({
          error: "Datos inválidos",
          detalles: parsedData.error.errors,
        });
      }

      const citaExistente = await Cita.obtenerCitaPorId(id);
      if (!citaExistente) {
        return res.status(404).json({ error: "Cita no encontrada" });
      }

      const resultado = await Cita.actualizarCita(id, parsedData.data);
      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Error actualizando cita:", error);
      return res.status(500).json({
        error: "Error interno del servidor - No se pudo actualizar la cita",
      });
    }
  }
}
