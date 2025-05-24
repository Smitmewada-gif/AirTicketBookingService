const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');
const axios = require('axios');

class BookingService {
  constructor(){
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const userId = data.userId;
      const noOfSeates = data.noOfSeates;

      const getFlighRequesttUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
      const flightServiceGetresponse = await axios.get(getFlighRequesttUrl);
      const flightData = flightServiceGetresponse.data.data;
      const flightPrice = flightData.price;

      if (noOfSeates > flightData.totalSeats){
        throw new ServiceError(
          'Something went wrong in the booking process',
          'Insufficient seats in the flights'
        )
      }

      const totalCost = noOfSeates * flightPrice;
      const bookingPayload = {...data, totalCost};

      const booking  = await this.bookingRepository.create(bookingPayload);

      const updateFligthRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      const seatsLeftAfterBooking = flightData.totalSeats - booking.noOfSeates;
      await axios.patch(updateFligthRequestUrl, {totalSeats: seatsLeftAfterBooking});
      const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});

      return finalBooking;
      
    } catch (error) {
      console.log(error);
      if(error.name == 'ValidationError' || error.name == 'RepositoryError'){
        throw error;
      }
      throw new ServiceError()
    }
  }
}

module.exports = BookingService;