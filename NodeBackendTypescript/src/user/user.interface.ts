import { Document } from 'mongoose';

export interface UserInterface {
    name: String;
    password: String;
    admin: Boolean;
}

export interface UserModelInteface extends UserInterface, Document {
    fullName(): string;
}