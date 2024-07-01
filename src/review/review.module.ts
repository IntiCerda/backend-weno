import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ReviewService } from "./review.services";
import { ReviewResolver } from "./review.resolver";

@Module({
    imports: [PrismaModule],
    providers: [ReviewService, ReviewResolver],
    exports: [ReviewService]
})
export class ReviewModule {}