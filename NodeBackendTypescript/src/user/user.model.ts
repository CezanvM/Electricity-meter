import { Schema, Model, model } from 'mongoose';
import { UserModelInteface } from './user.interface';

export class User {
    public model;

    constructor(private name: string, private password: string, private isAdmin: boolean) {
        this.model = new userModel({ name: this.name, password: this.password, isAdmin: this.isAdmin});
    }
}

export const userModel: Model<UserModelInteface> = model<UserModelInteface>('User',  new Schema({
    name: String,
    password: String,
    isAdmin: Boolean
}));
