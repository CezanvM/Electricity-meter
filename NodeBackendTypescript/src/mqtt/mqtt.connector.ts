import * as mqtt from 'mqtt';
import { MeasurementController } from '../measurement/measurement.controller';
import { measurementTopic } from '../measurement/measurement.model';
const config = require('../../config');

export class  MqttConnector {
    public static mqttClient;

    public static connect() {
       this.mqttClient = mqtt.connect(config.mqttBroker, { username: config['mqtt-username'], password: config['mqtt-password'] });
        this.mqttClient.on('connect', () => {
            console.log('mqtt connected');
            this.mqttClient.subscribe('measurement');
            this.mqttClient.publish('measurement', 'hallo wereld', {qos: 0});
        });

        this.mqttClient.on('message', (topic, message) => {
            // message is Buffer
            if (topic === measurementTopic) {
                MeasurementController.handleMeasurement(message);
            }
        });
    }
}