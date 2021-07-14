import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Readable } from 'stream';

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

  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  const s = new Readable();
  s.push(await GeneratePNG(width, height));
  s.push(null);
  ctx.body = s;
  ctx.attachment(`${width}x${height}.png`);

  console.log('Done');
});

app.listen(8081);
