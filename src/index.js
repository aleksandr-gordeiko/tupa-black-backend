import Koa from "koa";
import bodyParser from "koa-bodyparser";
import {createReadStream} from "fs";

import {GeneratePNG} from "./png";

const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
    let width = parseInt(ctx.request.body.width);
    let height = parseInt(ctx.request.body.height);

    await GeneratePNG(width, height);

    ctx.body = createReadStream("./static/sample.png");
    //ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.attachment("sample.png");
});

app.listen(3030);
