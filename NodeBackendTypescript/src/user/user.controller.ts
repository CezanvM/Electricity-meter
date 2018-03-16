import { Request, Response, NextFunction } from 'express';
import { IUser } from './user.interface';
import { userRepo } from './user.repository';

export class UserController {
    public getAll (req: Request, res: Response, next: NextFunction) {
        userRepo.retrieve((error, users: IUser[]) => {
            if (error) {
                return res.status(500).send('internal server error');
            }

            return res.status(200).json(users);
        });
    }

    public get(req: Request, res: Response, next: NextFunction) {
        userRepo.findById(req.params.id,  (err, user: IUser) => {
            if (err) {
                return res.status(500).send(err.toString());
            }

            return res.status(200).json(user);
        });
    }

    public post(req: Request, res: Response,  next: NextFunction) {
        userRepo.create(req.body as IUser, (err, user: IUser) => {
            if (err) {
                return res.status(500).json('internal server error');
            }

            return res.status(200).json(user);
        });
    }

    public linkSensor(req: Request, res: Response, next: NextFunction) {
        userRepo.findOne({
            name: req.body.name,
        }, (err, user: IUser) => {
            if (err) {
                return res.status(500).send('internal server error');
            }

            if (!user) {
                return res.status(404).send('User not found');
            }

            if (user) {
                userRepo.comparePassword(req.body.password, <string>user.password, (err, isMatch: boolean) => {
                    if (err) return res.status(500).send('internal server error');

                    if (!isMatch) return res.status(404).send('failed to authenticate user');

                    const userDoc = user;
                    if (isMatch) {
                        user.sensorId = req.body.sensorId;
                        userRepo.update(user.id, user, (err, user: IUser) => {
                            if (err) {
                                return res.status(500).send('internal server error');
                            }

                            return res.status(200).json(userDoc);
                        });
                    }
                });
            }
        });
    }
}

export let userController: UserController = new UserController();

