const Router = require('koa-router')
const send = require('koa-send')

// 处理'/public'开头的路径，针对静态文件
const staticRouter = new Router({
  prefix: '/public'
})

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
