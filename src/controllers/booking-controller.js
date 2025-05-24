const {BookingService} = require('../services/index')
const bookingService = new BookingService();
const {StatusCodes} = require('http-status-codes');
const createBooking = async (req, res) =>{
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully completed booking",
      error: {}
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      error: error.explanation
    });
  }
}

module.exports = {createBooking}