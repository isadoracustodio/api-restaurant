import express from "express";

import { routes } from "./routes/index"

import { errorHnadling } from "@/middlewares/error-handling"

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(routes)
app.use(errorHnadling)

app.listen(PORT, () => console.log(`Server ir running on port ${PORT}`));