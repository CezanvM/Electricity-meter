import { Document } from 'mongoose';

export interface MeasurementInterface {
    sensorId: string;
    version: number;
    date: Date;
    equipmentId: number;
    electricityTo1: number;
    electricityTo2: number;
    electricityBy1: number;
    electricityBy2: number;
    tariffId: number;
    electricityPowerDelivered: number;
    electricityPowerReceived: number;
    nrOfPowerFailures: number;
    powerFailures: object;
    nrOfVoltageSags: number;
    nrOfVoltageSwells: number;
    textMessage1: string;
    textMessage2: string;
    current: number;
    activePowerPlus: number;
    activePowerMin: number;
    deviceType: number;
    equipmentId2: number;
    gas: number;
}

export interface MeasurementModelInterface extends MeasurementInterface, Document { }