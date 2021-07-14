const error = async (ctx, next) => {
  try {
    await next();
  } catch (exception) {
    ctx.status = exception.status || 400;
    ctx.body = { error: exception.message };
  }
};

export default error;
