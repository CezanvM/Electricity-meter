import { MeasurementInterface } from './measurement.interface';
import { measurementModel } from './measurement.model';

export class MeasurementController {
    public static handleMeasurement(measurement: MeasurementInterface) {
        const model = new measurementModel(measurement);
        model.save().catch((err) => console.warn(err.toString()));
    }
}