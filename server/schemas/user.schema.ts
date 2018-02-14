import * as mongoose from 'mongoose';


const SALT_WORK_FACTOR = 10;
// const DEFAULT_USER_PICTURE = '/img/user.jpg';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String },
    // socialId: { type: String, default: null },
    // picture:  { type: String, default:  DEFAULT_USER_PICTURE}
});
