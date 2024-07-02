import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BookingObject } from "./booking.dto";
import { CreateBooking } from "./create-booking.dto";
import { UserService } from "src/users/user.service";
import { ServicesService } from "src/services/service.service";

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService,
        private userService: UserService,
        private serviceService: ServicesService
    ) {}


    async getAllBooking():Promise<BookingObject[]>{
        return await this.prisma.booking.findMany({
            include: {
                user: true,
                service: {
                    include: {
                        user: true,
                        category: true,
                    }
                },
                review: true
            }
        });
    }

    async createBooking(createBookingInput: CreateBooking): Promise<BookingObject>{
        const {id_user, id_service, date, hour} = createBookingInput;

        const userFound = await this.userService.getUserById(id_user)

        if(!userFound){
            throw new Error('User not found')
        }

        const serviceFound = await this.serviceService.getServiceById(id_service)

        if(!serviceFound) throw new Error('Service not found')
        
            
        const existingBooking = await this.prisma.booking.findFirst({
            where: {
                id_service: serviceFound.id,
                date,
                hour
            }
        });

        if (existingBooking) {
            throw new Error('Booking already exists for this service, date, and hour');
        }


        return await this.prisma.booking.create({
            data: {
                user: {
                    connect: {
                        id: userFound.id
                    }
                },
                service: {
                    connect: {
                        id: serviceFound.id
                    }
                },
                date,
                hour
            },
            include: {
                user: true,
                service: {
                    include: {
                        user: true,
                        category: true,
                    }
                },
                review: true
            }
        });

    }
}