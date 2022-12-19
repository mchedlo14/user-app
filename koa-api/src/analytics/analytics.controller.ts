import * as Koa from "koa";
import * as Router from "koa-router";
import UsersRepository from "../users/users.repository";

const usersDb = new UsersRepository();

const routerOpts: Router.IRouterOptions = {
    prefix: "/analytics",
};

const router: Router = new Router(routerOpts);

router.get("/users", async (ctx: Koa.Context) => {
    const users = usersDb.getUsers();
    const analytics = new Map();
    let country;
    users.map((user) => {
        country = user["address"]["city"];
        if (analytics.has(country)) {
            analytics.set(country, analytics.get(country) + 1);
        } else {
            analytics.set(country, 1);
        }
    });
    ctx.body = {
        "error": false,
        "data": Object.fromEntries(analytics),
    };
});

export default router;
