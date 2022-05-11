import { NextFunction, Response, Request } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login
            }, 
            {
                path: '/register',
                method: 'post',
                func: this.register
            }
        ])
    }
    
    login(req: Request, res: Response, next: NextFunction){
        next(new HTTPError(401, 'Not Authorized', 'Login'));
    }

    register(req: Request, res: Response, next: NextFunction){
        this.ok(res, 'Reg!');
    }
}
