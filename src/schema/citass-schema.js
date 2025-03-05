import z from "zod";

export const MotivoEnum = z.enum(["Ansiedad", "Depresión", "Estrés", "Autoestima", "Relaciones", "Otro"]);

export const CitaSchema = z.object({
  titulo: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  horaInicio: z.string().regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)"),
  horaFin: z.string().regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)"),
  motivo: MotivoEnum,
});

export const validateData = (input) => {
  const result = CitaSchema.safeParse(input);
  if (!result.success) throw new Error("Datos inválidos");
  return result.data;
};
