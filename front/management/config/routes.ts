
export default [
  // 登录
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  // 欢迎
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },


  // 仪表盘
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './Dashboard'
  },

  // 商品管理
  {
    path: '/user-manage',
    name: 'user',
    icon: 'RedditOutlined',
    component: './userManage'
  },

  // 商品管理
  {
    path: '/goods',
    name: 'goods',
    icon: 'FileSearchOutlined',
    component: './Goods'
  },

  // 浏览记录
  {
    path: '/explore',
    name: 'explore',
    icon: 'ChromeOutlined',
    component: './Explore'
  },

  // 订单管理
  {
    path: '/order',
    name: 'order',
    icon: 'ContainerOutlined',
    component: './Order'
  },

  // 管理记录
  {
    path: '/manage-record',
    name: 'manage-record',
    icon: 'ControlOutlined',
    component: './ManageRecord'
  },

  // 登录记录
  {
    path: '/login-record',
    name: 'login-record',
    icon: 'DesktopOutlined',
    component: './LoginRecord'
  },


  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
