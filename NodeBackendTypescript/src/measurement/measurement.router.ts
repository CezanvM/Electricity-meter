import { Router } from 'express';
import { measurementController } from './measurement.controller';

export class MeasurementRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', measurementController.getAll);
        this.router.get('/:id', measurementController.get);
        this.router.get('/sensor/:id', measurementController.getBySensorId);
    }
}

export let measurementRouter: MeasurementRouter = new MeasurementRouter();