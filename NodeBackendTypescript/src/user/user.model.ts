import { Schema, Model, model } from 'mongoose';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';

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


        if (!this.isModified('password')) { return next(); }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(doc.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
                return this;
            });
        });
    }

});

export let user: Model<IUser> = model<IUser>('User',  userSchema);

