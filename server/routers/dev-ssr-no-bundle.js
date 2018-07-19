const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

// 在node环境中编译webpack
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()

// 指定webpack compiler的输出地址
serverCompiler.outputFileSystem = mfs

// 记录webpack的打包
let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) {
    console.log('serverCompiler -> ', err)
    throw err
  }

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(err => console.log(err))

  // bundle的输出文件路径
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  // 读取后转化为json，提供给vue-server-renderer使用
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('server bundle generated.')

})

// 处理服务端渲染的返回
const handleSSR = async ctx => {

  // 如果bundle未生成，或者不存在
  if (!bundle) {
    ctx.body = 'please wait a moment.'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8010/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
