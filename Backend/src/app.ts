import express from "express";
import cors from "cors";
import { errorHandler } from "./api/middleware/error";
import { routes } from "./api/routes";
import { config } from "./config/environment";
import {fileFilter, fileStorage} from "./services/fileStorage";
import multer from 'multer';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// logging
app.use((req, res, next) => {
  const body = req.body;
  const endpoint = req.originalUrl;
  console.log('Request body:', body, 'path:', endpoint);
  next();
});

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('photo'));
app.use('../data/images', express.static('data/images'));


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
