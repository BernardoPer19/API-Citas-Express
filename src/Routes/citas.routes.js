import { Router } from "express";
import { CitaController } from "../controllers/citas.controller.js";

export const citasRoutes = Router();

citasRoutes.get("/", CitaController.getData);
citasRoutes.post("/", CitaController.addData);
citasRoutes.delete("/:id", CitaController.removeData);
citasRoutes.put("/:id", CitaController.updateData)