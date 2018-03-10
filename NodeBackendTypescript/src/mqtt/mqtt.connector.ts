import * as mqtt from 'mqtt';
const config = require('../../config');
export class  MqttConnector {
    public static mqttClient;

    public static connect() {
       this.mqttClient = mqtt.connect(config.mqttBroker);
        this.mqttClient.on('connect', () => {
            console.log('mqtt connected');
            this.mqttClient.subscribe('_cas_');
            this.mqttClient.publish('_cas_', 'hallo wereld', {qos: 0});
        });

        this.mqttClient.on('message', (topic, message) => {
            // message is Buffer
            console.log(message.toString());
        });
    }
}