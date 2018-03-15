import { Schema, Model, model } from 'mongoose';
import { IUser } from './user.interface';

export let userSchema: Schema = new Schema({
    objectId: Schema.Types.ObjectId,
    name: String,
    password: String,
    isAdmin: Boolean,
    sensorId: String,
    createdAt: Date,
    modifiedAt: Date
}).pre('save', function(next) {
    if (this._doc) {
        const doc = <IUser>this._doc;
        const now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let user: Model<IUser> = model<IUser>('User',  userSchema);

