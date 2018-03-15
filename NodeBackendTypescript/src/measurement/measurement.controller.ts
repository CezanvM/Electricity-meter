import { IMeasurement } from './measurement.interface';
import { measurementRepo } from './measurement.repository';
import { NextFunction, Request, Response } from 'express';
import { measurement } from './measurement.model';

export class MeasurementController {
    public handleMeasurement(measurement) {
        measurementRepo.create(measurement, (err, measurement: IMeasurement) => {
            if (err) {
                console.warn(err.toString());
            }
        });
    }

    public getBySensorId(req: Request, res: Response, next: NextFunction) {
        const conditions = {
            sensorId: req.params.id
        };

        measurement.find(conditions, (err, measurements: IMeasurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurments not found');

            return res.status(200).json(measurements);
        });
    }

    public get(req: Request, res: Response, next: NextFunction) {
        measurementRepo.findById(req.params.id, (err, measurement: IMeasurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurement) return res.status(404).send('measurement not found');

            return res.status(200).json(measurement);
        });
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        measurementRepo.retrieve((err, measurements: IMeasurement[]) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }
}

export let measurementController: MeasurementController = new MeasurementController();