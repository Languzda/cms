import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "72h",
  },
};
