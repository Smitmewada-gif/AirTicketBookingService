const {BookingService} = require('../services/index')
const bookingService = new BookingService();
const {StatusCodes} = require('http-status-codes');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');

const {createChannel, publishMessage} = require('../utils/messageQueue');
class BookingController{

  constructor(channel){
  }

  async sendMessageToQueue(req, res){
    const channel = await createChannel();
    const data = {message: 'Success'};
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: 'Successfully published the event'
    })
  }
  async createBooking(req, res){
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
}

module.exports = BookingController