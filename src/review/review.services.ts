import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewObject } from "./review.dto"; 
import { ReviewInput } from "./create-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAllReviews(): Promise<ReviewObject[]>{
        return await this.prisma.review.findMany()
    }


    async createReview( reviewImput: ReviewInput): Promise<ReviewObject>{
        const {qualification, comment} = reviewImput
        return await this.prisma.review.create({
            data: {
                qualification,
                comment
            }
        })

    }

    async deleteReviewById(id: string): Promise<ReviewObject>{
        return await this.prisma.review.delete({
            where: {
                id: id
            }
        })
    }


    async getReviewById(id: string): Promise<ReviewObject>{
        return await this.prisma.review.findUnique({
            where: {
                id
            }
        })
    }
}