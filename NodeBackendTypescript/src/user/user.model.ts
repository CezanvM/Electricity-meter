import { Schema, Model, model } from 'mongoose';
import { UserModelInteface } from './user.interface';

export let userModel: Model<UserModelInteface> = model<UserModelInteface>('User',  new Schema({
    objectId: Schema.Types.ObjectId,
    name: String,
    password: String,
    isAdmin: Boolean
}));
