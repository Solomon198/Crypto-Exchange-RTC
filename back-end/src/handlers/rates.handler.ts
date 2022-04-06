import * as SocketIO from 'socket.io';
import Models from '../models/index';

export default function Rates(socket: SocketIO.Socket) {
  const getRate = async () => {
    const rates = await Models.Rates.find({});
    socket.emit('live:rate', rates);
  };

  // sends rate to client when connection is successfully established
  getRate();

  // sends rate to a specific client when requested for it
  socket.on('get:rate', getRate);
}
