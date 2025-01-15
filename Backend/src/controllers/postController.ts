import {PostService} from "../services/postService";
import type { Request, Response } from "express";
import {Prisma} from "@prisma/client";

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    async createPost(req: Request, res: Response) {
        try {

            const { title,  source, authorId} = req.body;

            if (!req.file) {
                throw new Error('No image provided' );
            }

            console.log(req.file);
            const photo_path  = req.file.path.replace('\\', '/').replace('\\', '/');
            console.log(photo_path);

            const author: Prisma.usersCreateNestedOneWithoutPostsInput = {
                connect: {
                    id: authorId,
                },
            };

            if (!title || !source || !authorId) {
                return res.status(400).json({ message: "Brak wymaganych danych"});
            }

            const post = await this.postService.createPost({
                title,
                source,
                author,
                photo_path,
            });

            return res.status(201).json({
                post,
                message: "Post został utworzony pomyślnie",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Błąd serwera" });
        }
    }

    async getPosts(req: Request, res: Response) {
        try {
            const { pagination, page, includeDeleted } = req.query;

            if(pagination && isNaN(Number(pagination))) {
                return res.status(400).json({ message: "Nieprawidłowa wartość paginacji" });
            }

            if(page && isNaN(Number(page))) {
                return res.status(400).json({ message: "Nieprawidłowa wartość strony" });
            }

            const take= pagination ? Number(pagination) : 10;
            const skip =page ? Number(page) * take : 0;

            const options = {
                take,skip, includeDeleted: !!includeDeleted,
            }
            const posts = await this.postService.getPosts(options);
            return res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Błąd serwera" });
        }
    }
}