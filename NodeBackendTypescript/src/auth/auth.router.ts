import { Router } from 'express';
import { authController } from './auth.controller';

export class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.post('/', authController.authenticate);
        this.router.post('/sensor/', authController.linkSensor);
    }
}

export let authRouter: AuthRouter = new AuthRouter();