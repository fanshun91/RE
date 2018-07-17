// 配置path
export default [
  // 默认路由
  {
    path: '/',
    redirect: '/login'
  },
  // 登录页
  {
    path: '/login',
    component: () => import('../views/login/index.vue') // by use babel-plugin-syntax-dynamic-import 异步路由
  },
  // 用户管理
  {
    path: '/users',
    component: () => import('../views/user/user-manage.vue')
  },
  // 用户详情
  {
    path: '/details/:wxid',
    props: true,
    component: () => import('../views/user/user-default.vue')
  },
  // 内容管理 1.红包通知
  {
    path: '/enve_notice',
    component: () => import('../views/contents/enve-notice.vue')
  },
  // 内容管理 2.用户留言
  {
    path: '/user_msg',
    component: () => import('../views/contents/user-msg.vue')
  },
  // 订单管理
  {
    path: '/orders',
    component: () => import('../views/orders/index.vue')
  },
  // 提现管理 1.提现记录
  {
    path: '/wd_records',
    component: () => import('../views/property/wd-record.vue')
  },
  // 提现管理 2.待审核提现
  {
    path: '/pendings',
    component: () => import('../views/property/pengding.vue')
  },
  // 提现管理 3.异常提现
  {
    path: '/exceptions',
    component: () => import('../views/property/wd-exception.vue')
  },
  // 举报管理
  {
    path: '/reports',
    component: () => import('../views/reports/index.vue')
  },
  // 消息提醒
  {
    path: '/msgs',
    component: () => import('../views/msgs/index.vue')
  }
]
