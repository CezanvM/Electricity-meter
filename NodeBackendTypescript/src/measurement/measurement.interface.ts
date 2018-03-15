import { Document } from 'mongoose';

export interface MeasurementInterface {
    version: string;
    timestamp: string;
    equipmentId: string;
    electricityTo1: string;
    electricityTo2: string;
    electricityBy1: string;
    electricityBy2: string;
    tariffId: string;
    electricityPowerDeliverd: string;
    electricityPowerReceived: string;
    nrOfPowerFailures: string;
    nrOfVoltageSags: string;
    nrOfVoltageSwells: string;
    textMessage1: string;
    textMessage2: string;
    current: string;
    activePowerPlus: string;
    activePowerMin: string;
    deviceType: string;
    equipmentId2: string;
}

export interface MeasurementModelInterface extends MeasurementInterface, Document { }