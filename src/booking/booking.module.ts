import { Module } from "@nestjs/common";
import { BookingResolver } from "./booking.resolver";
import { PrismaModule } from "src/prisma/prisma.module";
import { BookingService } from "./booking.service";

@Module({
    imports: [PrismaModule],
    providers: [BookingResolver, BookingService],
    exports: [BookingService]
})