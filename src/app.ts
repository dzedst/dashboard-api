import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata'

@injectable()
export class App {

    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter) {

        this.app = express();
        this.port = 3000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    };


    useRoutes() {
        this.app.use('/users', this.userController.router)
    };

    useExceptionsFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionsFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started at http://localhost:${this.port}`);
    };
}