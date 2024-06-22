import { Resolver } from "@nestjs/graphql";
import { ReviewService } from "./review.services";

@Resolver()
export class ReviewResolver {
    constructor(private readonly reviewService : ReviewService) {}

}