import { Module } from "@nestjs/common";
import { BookingResolver } from "./booking.resolver";
import { PrismaModule } from "src/prisma/prisma.module";
import { BookingService } from "./booking.service";
import { ServiceModule } from "src/services/service.module";
import { UserModule } from "src/users/user.module";

@Module({
    imports: [PrismaModule,UserModule, ServiceModule],
    providers: [BookingResolver, BookingService],
    exports: [BookingService]
})
export class BookingModule {}