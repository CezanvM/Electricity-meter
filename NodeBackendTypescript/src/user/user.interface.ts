import { Document } from 'mongoose';

export interface IUser extends Document {
    name: String;
    password: String;
    admin: Boolean;
    sensorId: string;
    createdAt: Date;
    modifiedAt: Date;
}