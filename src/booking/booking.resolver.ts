import { BookingService } from "./booking.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateBooking } from "./create-booking.dto";
import { BookingObject } from "./booking.dto";

@Resolver()
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [BookingObject])
  async getAllBooking(): Promise<BookingObject[]> {
    return this.bookingService.getAllBooking();
  }

  @Mutation(() => BookingObject)
  async createBooking(@Args('createBookingInput') createBookingInput: CreateBooking): Promise<BookingObject> {
    return this.bookingService.createBooking(createBookingInput);
  }

  @Query(() => [BookingObject])
  async getBookingsByIdUser(@Args('id_user') id_user: string){
    return this.bookingService.getBookingsByIdUser(id_user);
  }

  @Mutation(() => BookingObject)
  async cancelBookingById(@Args('id_booking') id_booking: string){
    return this.bookingService.cancelBookingById(id_booking);
  }
}

