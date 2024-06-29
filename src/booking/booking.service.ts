import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BookingObject } from "./booking.dto";
import { CreateBookingInput } from "./create-booking.dto";

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}


    async findAll():Promise<BookingObject[]>{
        return this.prisma.booking.findMany();
    }
//
 //   async createBooking(createBookingInput: CreateBookingInput): Promise<BookingObject>{
//       const {} = createBookingInput;
//        return this.prisma.booking.create({
 //           data:{
//
 //           }
//        })
//    }
}