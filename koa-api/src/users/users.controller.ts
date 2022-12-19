import * as Koa from "koa";
import * as Router from "koa-router";
import UsersRepository from "./users.repository";

const usersDb = new UsersRepository();

const routerOpts: Router.IRouterOptions = {
    prefix: "/users",
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
    const users = usersDb.getUsers();
    ctx.body = {
        "error": false,
        "data": users
    };
});

router.get("/:user_id", async (ctx: Koa.Context) => {
    const userID: number = +ctx.params.user_id;
    const user = usersDb.getUserByID(userID);
    ctx.body = {
        "error": false,
        "data": user
    };
});

router.post("/", async (ctx: Koa.Context) => {
    const user = ctx.request.body;
    const addedUser = usersDb.addUser(user);
    ctx.body = {
        "error": false,
        "data": addedUser
    };
});

router.delete("/:user_id", async (ctx: Koa.Context) => {
    const userID: number = +ctx.params.user_id;
    usersDb.removeUserByID(userID);
    ctx.body = {
        "error": false,
        "data": null
    };
    // ctx.body = userID
});

router.patch("/:user_id", async (ctx: Koa.Context) => {
    const userID: number = +ctx.params.user_id;
    const user = ctx.request.body;
    const updatedUser = usersDb.updateUserByID(userID, user);
    ctx.body = {
        "error": false,
        "data": updatedUser
    };
});

export default router;
