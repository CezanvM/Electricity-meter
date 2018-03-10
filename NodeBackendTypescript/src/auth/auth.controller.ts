import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userModel } from '../user/user.model';
const config = require('../../config');

export class AuthController {

    public authenticate(req: Request, res: Response) {

        userModel.findOne({
            name: req.body.name
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                if (user.password !== req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
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
                }
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