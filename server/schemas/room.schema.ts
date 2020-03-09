import * as mongoose from 'mongoose';
export const RoomSchema = new mongoose.Schema({
  title: String,
  connections: String,
  messages: [ { username: String, text: String } ],
  date: { type: Date, default: Date.now }
});
