import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepo } from '../user/user.repository';
const config = require('../../config');

export class AuthController {

    public authenticate(req: Request, res: Response) {

        userRepo.findOne({
            name: req.body.name
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                userRepo.comparePassword(req.body.password, user.password, (err, isMatch: boolean) => {
                    if (err) { return res.json({ success: false, message: 'internal server error.' }); }
                    if (isMatch) {
                        const payload = {
                            admin: user.admin
                        };

                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: '24h'
                        });

                        console.log('time for response');
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token
                        });
                    } else {
                        return res.json({ success: false, message: 'failed to authenticate user' });
                    }
                });
            }
        });
    }

    public verify(req: Request, res: Response, next: NextFunction) {
        let token = req.body.token || req.query.token || req.headers.authorization;


        if (token) {
            token = token.indexOf('Bearer') >= 0 ? token.substr(7, token.length) : token;

            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    /* tslint:disable:no-string-literal */
                    req['decoded'] = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
}

export let authController: AuthController = new AuthController();