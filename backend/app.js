const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const api = require('./routes/index')

app.use(koaBody());

app
    .use(api.routes())
    .use(api.allowedMethods())

app.listen(1337)