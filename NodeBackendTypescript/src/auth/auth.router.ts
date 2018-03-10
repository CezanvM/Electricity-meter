import { Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRouter {
    router: Router;
    controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.init();
    }

    init() {
        this.router.post('/', this.controller.authenticate);
    }
}