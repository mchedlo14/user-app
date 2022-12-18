import * as Koa from "koa";
import * as HttpStatus from "http-status-codes";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors"
import * as logger from "koa-logger";

import usersController from "../users/users.controller";

const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = {error};
        ctx.app.emit("error", error, ctx);
    }
});

// Route middleware.
app.use(cors());
app.use(logger());
app.use(bodyParser())
app.use(usersController.routes());
app.use(usersController.allowedMethods());

// Application error logging.
app.on("error", console.error);

export default app;
