import {PostRepository} from "../db/repositories";
import type {posts, Prisma} from "@prisma/client";

export class PostService{
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async createPost(postData: Prisma.postsCreateInput): Promise<posts> {
        return this.postRepository.createPost(postData);
    }

    async deletePost(postId: string): Promise<posts> {
        return this.postRepository.deletePost(postId);
    }

    async getPosts(options?: {
        take?: number;
        skip?: number;
        includeDeleted?: boolean;
    }){
        return this.postRepository.getPosts(options);
    }
}