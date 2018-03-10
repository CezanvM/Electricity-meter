import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { UserRouter } from './user/user.router';
import { DatabaseConnector } from './database/database.connector';
import { AuthRouter } from './auth/auth.router';
import { GuardRouter } from './guard/guard.router';
import { MqttConnector } from './mqtt/mqtt.connector';

const config = require('../config');
// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        DatabaseConnector.connect(config['db-connection-string'] + '/' + config['db-name']);
        MqttConnector.connect();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/api', new GuardRouter().router);
        this.express.use('/authenticate', new AuthRouter().router);
        this.express.use('/api/user', new UserRouter().router);
    }

}

export default new App().express;