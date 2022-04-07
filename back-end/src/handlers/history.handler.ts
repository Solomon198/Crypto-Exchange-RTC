import * as SocketIO from 'socket.io';
import { Types } from 'mongoose';
import Models from '../models/index';
import { History as HistoryProps } from '../Types/interfaces';

type getQuery = {
  from: Date;
  to: Date;
  type: 'All' | 'Live Price' | 'Exchanged';
};
export default function History(
  socket: SocketIO.Socket,
  IO: SocketIO.Server,
) {
  const getHistory = async (payload?: getQuery) => {
    let query = {};
    // checking if user passed filter option
    if (payload) {
      // composing mongodb query
      if (payload.type !== 'All') {
        query = { ...query, type: payload.type };
      }
      const { from, to } = payload;
      query = {
        ...query,
        date: {
          $gte: new Date(from),
          $lt: new Date(to),
        },
      };
    }
    const history = await Models.History.find(query)
      .sort({ _id: -1 })
      .limit(10);
    socket.emit('live:history', history);
  };

  const EmitRecentHistory = async () => {
    const history = await Models.History.find({})
      .sort({ _id: -1 })
      .limit(10);
    IO.emit('live:history', history);
  };

  const saveHistory = async (payload: HistoryProps) => {
    const newHistory = new Models.History(payload);
    // eslint-disable-next-line no-underscore-dangle
    newHistory._id = new Types.ObjectId();
    await newHistory.save();
    socket.emit('saved:history', 'success');
    EmitRecentHistory();
  };

  // sends history to client when connection is successfully established
  getHistory();

  // sends history to a specific client when requested for it
  socket.on('get:history', getHistory);
  // save new exchange
  socket.on('save:history', saveHistory);
}
