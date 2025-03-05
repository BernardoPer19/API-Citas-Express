import express from "express";
import {citasRoutes} from './Routes/citas.routes.js'
const app = express();

app.use(express.json()); 
app.use("/citas", citasRoutes); 

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
