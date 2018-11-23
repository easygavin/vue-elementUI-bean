// 菜单列表
export const menus = [
  {
    name: '我的服务',
    path: '/service',
    icon: 'el-icon-goods'
  },
  {
    name: '我的应用',
    path: '/application',
    icon: 'el-icon-menu'
  },
  {
    name: '账号管理',
    path: '/account',
    icon: 'el-icon-service',
    children: [
      {
        name: '个人信息',
        path: '/account/info'
      }
    ]
  },
  {
    name: '系统管理',
    path: '/sys_cfg',
    icon: 'el-icon-setting',
    children: [
      {
        name: '成员管理',
        path: '/sys_cfg/memeber'
      }
    ]
  }
]