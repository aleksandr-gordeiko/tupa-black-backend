import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createReadStream } from 'fs';

import error from './middlewares/error';
import requestLogger from './middlewares/requestLogger';

import GeneratePNG from './png';

const app = new Koa();

app.use(bodyParser());
app.use(error);
app.use(requestLogger);

app.use(async (ctx) => {
  const width = parseInt(ctx.request.body.width, 10);
  const height = parseInt(ctx.request.body.height, 10);

  await GeneratePNG(width, height);

  ctx.body = createReadStream('./static/sample.png');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.attachment('sample.png');

  console.log('Done');
});

app.listen(8081);
