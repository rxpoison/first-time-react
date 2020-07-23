const Koa = require('koa')
const app = new Koa()
const BodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const router = require('./routes/routes')

app.use(BodyParser())
app.use(cors({
        origin: '*',
        allowMethods: ['GET','POST','HEAD','PUT','POST','DELETE','PATCH'],
        exposeHeaders: ['x-request-Id']
    })
)
app.use(router.routes())
const ports = 3030;
app.listen(process.env.PORT || ports, () => {
  console.log(`Api gateway start at port:${ports}`)
})