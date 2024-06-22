import { BookingService } from "./booking.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateBookingInput } from "./create-booking.dto";
import { BookingObject } from "./booking.dto";

@Resolver()
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @Query(() => [BookingObject])
  async bookings(): Promise<BookingObject[]> {
    return this.bookingService.findAll();
  }

  @Mutation(() => BookingObject)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput): Promise<BookingObject> {
    return this.bookingService.createBooking(createBookingInput);
  }
}

