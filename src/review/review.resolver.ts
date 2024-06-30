import { Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import { ReviewService } from "./review.services";
import { ReviewObject } from "./review.dto";
import { ReviewInput } from "./create-review.dto";

@Resolver()
export class ReviewResolver {
    constructor(private readonly reviewService : ReviewService) {}

    @Query(() => [ReviewObject])
    async getAllReviews() {
        return await this.reviewService.getAllReviews();
    }

    @Mutation(() => ReviewObject)
    async createReview(@Args('reviewImput') reviewImput: ReviewInput){
        return await this.reviewService.createReview(reviewImput)
    }

}