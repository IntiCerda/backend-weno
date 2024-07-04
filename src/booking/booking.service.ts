import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BookingObject } from "./booking.dto";
import { CreateBookingInput } from "./create-booking.dto";
import { UserService } from "src/users/user.service";
import { ServicesService } from "src/services/service.service";
import { ReviewService } from "src/review/review.services";
import { ReviewObject } from "src/review/review.dto";

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService,
        private readonly userService: UserService,
        private readonly serviceService: ServicesService,
        private readonly reviewService: ReviewService
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

    async createBooking(createBookingInput: CreateBookingInput): Promise<BookingObject> {
        const { id_user, id_service, date, time } = createBookingInput;

        const userFound = await this.userService.getUserById(id_user);
        if (!userFound) {
            throw new Error('User not found');
        }
        console.log("Paso1");
        const serviceFound = await this.serviceService.getServiceById(id_service);
        if (!serviceFound) {
            throw new Error('Service not found');
        }
        console.log("Paso2");
        const dateValid = await this.checkDate(date);
        if (!dateValid) {
            throw new Error('Date is invalid');
        }
        console.log("Paso3");
        const timeValid = await this.checkTime(time);
        if (!timeValid) {
            throw new Error('Time is invalid');
        }
        console.log("Paso4");
        const existingBooking = await this.findExistingBooking(id_service, date, time);
        if (existingBooking) {
            throw new Error('Booking already exists for this service, date, and hour');
        }
        console.log("Paso5");
        return await this.prisma.booking.create({
            data: {
                user: {
                    connect: {
                        id: id_user
                    }
                },
                service: {
                    connect: {
                        id: id_service
                    }
                },
                date,
                hour: time,

            },
            include: {
                user: true,
                service: {
                    include: {
                        user: true,
                        category: true,
                    }
                }
            }
        });
    }

    async findExistingBooking(id_service: string, date: string, time: string): Promise<BookingObject> {
        const existingBooking = await this.prisma.booking.findFirst({
            where: {
                id_service: id_service,
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
        return existingBooking;
    }
    
    
    


    async checkDate(date: string): Promise<boolean> {
        const datePart: string = date.split('T')[0];
        const [year, month, day]: number[] = datePart.split('-').map(Number);
    
        const YEAR: number = year;
        const MONTH: number = month;
        const DAY: number = day;
    
        console.log(`Year: ${YEAR}, Month: ${MONTH}, Day: ${DAY}`);
    
        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);
        
        const inputDate: Date = new Date(YEAR, MONTH - 1, DAY);
        console.log(`Today: ${today}`);
        console.log(`Input Date: ${inputDate}`);
    
        if (inputDate < today) {
            return false;
        } else {
            return true;
        }
    }
    

    async checkTime(time: string): Promise<boolean> {
        const [hour, minute]: number[] = time.split(':').map(Number);
        
        const providedHour: number = hour;
        const providedMinute: number = minute;
    
        console.log(`Provided Hour: ${providedHour}, Provided Minute: ${providedMinute}`);
        
        const now: Date = new Date();
        const currentHour: number = now.getHours();
        const currentMinute: number = now.getMinutes();
        
        console.log(`Current Hour: ${currentHour}, Current Minute: ${currentMinute}`);
        
        if (providedHour < currentHour || (providedHour === currentHour && providedMinute <= currentMinute)) {
            return false;
        } else {
            return true;
        }
    }
    


    async getBookingsByIdUser(id_user: string): Promise<BookingObject[]> {
        return await this.prisma.booking.findMany({
            where: {
                id_user
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

    async cancelBookingById(id: string): Promise<BookingObject> {
        return await this.prisma.booking.delete({
            where: {
                id
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


    async addReviewToBooking(id_booking: string, id_review: string): Promise<BookingObject> {
        const bookingFound = await this.getBookingById(id_booking);

        if (!bookingFound)  throw new NotFoundException('Booking not found');

        const reviewFound = await this.reviewService.getReviewById(id_review);

        if (!reviewFound) throw new NotFoundException('Review not found');

        return await this.prisma.booking.update({
            where: {
                id: id_booking
            },
            data: {
                review: {
                    connect: {
                        id: id_review
                    }
                }
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


    async getBookingById(id_booking: string): Promise<BookingObject> {
        return await this.prisma.booking.findUnique({
            where: {
                id: id_booking
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


    async getReviewByBookingId(id_booking: string): Promise<BookingObject> {
        return await this.prisma.booking.findUnique({
            where: {
                id: id_booking
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

    
    async getReviewsByServiceId(id_service: string): Promise<ReviewObject[]> {
        const bookings = await this.prisma.booking.findMany({
            where: {
                id_service: id_service,
            },
            include: {
                review: true,
            },
        });

        const reviews = bookings.flatMap(booking => booking.review);

        return reviews;
    }
}