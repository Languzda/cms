import { Router } from "express";
import {PostController} from "../../controllers/postController";

const router = Router();

router.post("/create",async (req, res) => {
     await new PostController().createPost(req, res);
});

router.get("/", async (req, res) => {
    await new PostController().getPosts(req, res);
});

export default router;
