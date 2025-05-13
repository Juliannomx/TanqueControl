import express from "express";
import waterTankRoutes from "./routes/water-tank";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/water-tank/", waterTankRoutes);

app.use(errorHandler);

export default app;
