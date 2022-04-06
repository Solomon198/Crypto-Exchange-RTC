import * as SocketIO from 'socket.io';
import Models from '../models/index';

export default function History(socket: SocketIO.Socket) {
  const getHistory = async () => {
    const history = await Models.History.find({})
      .sort({ _id: -1 })
      .limit(10);
    socket.emit('live:history', history);
  };

  // sends history to client when connection is successfully established
  getHistory();

  // sends history to a specific client when requested for it
  socket.on('get:history', getHistory);
}
