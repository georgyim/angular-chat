import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
    // title: { type: String, required: true },
    // connections: { type: [{ userId: String, socketId: String }]},
    title: String,
    connections: String,
    messages:  [{username: String, text: String}]
});
