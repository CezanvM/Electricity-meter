import { IMeasurement } from './measurement.interface';
import { measurementRepo, MeasurementRepository } from './measurement.repository';
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
        req.query.sensorId = req.params.id;

        measurement.find(req.query, (err, measurements: IMeasurement) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }

    public get(req: Request, res: Response, next: NextFunction) {
        new MeasurementRepository().findById(req.params.id, (err, measurement: IMeasurement) => {
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

    public filter(req: Request, res: Response, next: NextFunction) {
        measurementRepo.find(req.query, (err, measurements: IMeasurement[]) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }

    public betweenDates(req: Request, res: Response, next: NextFunction) {
        const beginDate: Date = new Date(req.query.beginDate);
        const endDate: Date = new Date(req.query.endDate);
        delete req.query.beginDate;
        delete req.query.endDate;
        measurementRepo.findBetweenDates('timestamp', beginDate , endDate, req.query, (err, measurements: IMeasurement[]) => {
            if (err) return res.status(500).send('internal server error');

            if (!measurements) return res.status(404).send('measurements not found');

            return res.status(200).json(measurements);
        });
    }
}

export let measurementController: MeasurementController = new MeasurementController();