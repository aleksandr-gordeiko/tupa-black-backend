import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createReadStream } from 'fs';

import error from './middlewares/error';
import requestLogger from './middlewares/requestLogger';

import GeneratePNG from './png';
import { WidthHeightRequest } from './types/WidthHeightRequest';

const app = new Koa();

app.use(bodyParser());
app.use(error);
app.use(requestLogger);

app.use(async (ctx) => {
  const data = <WidthHeightRequest><unknown>ctx.request.body;
  const width = parseInt(data.width, 10);
  const height = parseInt(data.height, 10);

  await GeneratePNG(width, height);

  ctx.body = createReadStream('./static/sample.png');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.attachment('sample.png');

  console.log('Done');
});

app.listen(8081);
