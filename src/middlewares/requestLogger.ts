const requestLogger = async (ctx, next) => {
  console.log(ctx.request.href);
  await next();
};

export default requestLogger;
