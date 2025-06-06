const { ValidationError, AppError } = require('../utils/errors/index');
const { Booking } = require('../models/index');
const {StatusCodes} = require("http-status-codes");

class BookingRepository{
  async create(data){
    try {
      const booking = await Booking.create(data);
      return booking;

    } catch (error) {

      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error);
      }

      throw new AppError(
        'RepositoryError',
        'Cannot create booking', 
        'There was some issue creating the booking, please try again later', 
        StatusCodes.BAD_REQUEST)
    }
  }

  async update(bookingId, data){
    try {
      const booking = await Booking.findByPk(bookingId);
      if(data.status){
        booking.status = data.status;
      }
      const response = await booking.save();
      return response;
    } catch (error) {
      throw new AppError(
        'RepositoryError',
        'Cannot update booking', 
        'There was some issue updating the booking, please try again later', 
        StatusCodes.BAD_REQUEST)
    }
  }
}

module.exports = BookingRepository;