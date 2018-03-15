import { MeasurementInterface } from './measurement.interface';
import { measurementModel } from './measurement.model';

export class MeasurementController {
    public static handleMeasurement(measurement) {
        const model = new measurementModel(measurement as MeasurementInterface);
        model.save().catch((err) => console.warn(err.toString()));
    }
}