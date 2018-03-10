import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';

export class GuardRouter {
    router: Router;
    controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.init();
    }

    init() {
        this.router.use(this.controller.verify);
    }
}