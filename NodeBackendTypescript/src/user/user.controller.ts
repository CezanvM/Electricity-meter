import { userModel } from './user.model';
import { Request, Response, NextFunction } from 'express';
import { MqttConnector } from '../mqtt/mqtt.connector';

export class UserController {
    public getAll (req: Request, res: Response, next: NextFunction) {
        return res.send('getAll users');
    }

    public get(req: Request, res: Response, next: NextFunction) {
        const user = new userModel({name: 'cas', password: 'password', isAdmin: false});
        user.save();

        return res.send('saved user with id: ' + req.params.id);
    }
}

