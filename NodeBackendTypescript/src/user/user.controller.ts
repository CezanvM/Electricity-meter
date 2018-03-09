import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';

export class UserController {
    public getAll (req: Request, res: Response, next: NextFunction) {
        return res.send('getAll users');
    }

    public get(req: Request, res: Response, next: NextFunction) {
        const user = new User('cas', 'password', false);
        user.model.save();
        return res.send('saved user with id: ' + req.params.id);
    }
}

