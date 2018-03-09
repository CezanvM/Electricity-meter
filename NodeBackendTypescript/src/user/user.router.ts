import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.init();
    }

    init() {
        this.router.get('/', this.controller.getAll);
        this.router.get('/:id', this.controller.get);
    }
}
