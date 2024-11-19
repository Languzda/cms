import { Router } from "express";

const router = Router();

router.get("/create", (req, res) => {
     res.status(201).json({ message: "Post created" });
});

export default router;
