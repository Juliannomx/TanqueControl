import express from "express";
import waterTankRoutes from "./routes/water-tank";
import usersRouter from "./routes/users";
import referenceValueRouters from "./routes/reference-value";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/water-tank/", waterTankRoutes);
app.use("/api/users/", usersRouter);
app.use("/api/reference-value/", referenceValueRouters);

app.use(errorHandler);

export default app;
