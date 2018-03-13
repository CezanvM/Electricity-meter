import { Schema, Model, model } from 'mongoose';
import { MeasurementModelInterface } from './measurement.interface';

export let measurementTopic = 'measurement';
export let measurementModel: Model<MeasurementModelInterface> = model<MeasurementModelInterface>('Measurement',  new Schema({
    objectId: Schema.Types.ObjectId,
    sensorId: {
        type: String,
        required: true
    },
    versionNr: Number,
    timestamp: {
        type: Date,
        required: true
    },
    equipmentId: {
        type: Number,
        required: true
    },
    electricityTo1: {
        type: Number,
        required: true
    },
    electricityTo2: {
        type: Number,
        required: true
    },
    electricityBy1: Number,
    electricityBy2: Number,
    tariffId: {
        type: Number,
        required: true
    },
    electricityPowerDelivered: {
        type: Number,
        required: true
    },
    electricityPowerReceived: Number,
    nrOfPowerFailures: Number,
    powerFailures: Number,
    nrOfVoltageSags: Number,
    nrOfVoltageSwells: Number,
    textMessage1: String,
    textMessage2: String,
    current: Number,
    activePowerPlus: Number,
    activePowerMin: Number,
    deviceType: Number,
    equipmentId2: {
        type: Number,
        required: true
    },
    gas: Number,
}));
