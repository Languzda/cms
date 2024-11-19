import express from "express";
import cors from "cors";
import { errorHandler } from "./api/middleware/error";
import { routes } from "./api/routes";
import { config } from "./config/environment";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling
app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
