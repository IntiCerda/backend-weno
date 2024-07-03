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
        const {id_user, id_service, selectdate} = createBookingInput;
        const {date, time} = selectdate;
        const userFound = await this.userService.getUserById(id_user)

        if(!userFound){
            throw new Error('User not found')
        }

        const serviceFound = await this.serviceService.getServiceById(id_service)

        if(!serviceFound) throw new Error('Service not found')
        

        const dateValid = await this.checkDate(selectdate);

        if (!dateValid) {
            throw new Error('Date is invalid');
        }

        const timeValid = await this.checkTime(selectdate);

        if (!timeValid) {
            throw new Error('Time is invalid');
        }
            
        const existingBooking = await this.prisma.booking.findFirst({
            where: {
                id_service: serviceFound.id,
                date,
                hour: time
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
                hour: time
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


    async checkDate(selectDate): Promise<boolean> {
        const {date, time} = selectDate;

        const datePart = date.split('T')[0]; 

        const [year, month, day] = datePart.split('-').map(Number);

        const YEAR = year;
        const MONTH = month;
        const DAY = day;

        console.log(`Year: ${YEAR}, Month: ${MONTH}, Day: ${DAY}`);

        const today = new Date();
        const inputDate = new Date(YEAR, MONTH - 1, DAY); 

        if (inputDate < today) {
            return false;
        } else {
            return true;
        }
        

    }

    async checkTime(selectDate): Promise<boolean> {
        const {date, time} = selectDate;

        const [hour] = time.split(':').map(Number);
        
        const providedHour = hour;
        
        console.log(`Provided Hour: ${providedHour}`);
        
        const now = new Date();
        const currentHour = now.getHours();
        
        console.log(`Current Hour: ${currentHour}`);
        

        if (providedHour <= currentHour) {
            return false;
        } else {
            return true;
        }
        
        
    }


}