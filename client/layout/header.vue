<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="[curKey]"
      :style="{ display: 'inline-block', lineHeight: '68px' }"
    >
      <a-menu-item v-for="i in navItems" :key="i.key">
        <router-link :to="i.path" tag="a">{{i.name}}</router-link>
      </a-menu-item>
    </a-menu>
    <div class="admin-status">
      <a-avatar style="backgroundColor:#87d068" icon="user" />
      <a href="#" @click="signOut">退出 <a-icon type="export" /></a>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  props: ["curKey"],
  data() {
    return {
      navItems: [
        {
          name: "用户管理",
          path: "/users",
          key: "1"
        },
        {
          name: "内容管理",
          path: "/enve_notice",
          key: "2"
        },
        {
          name: "订单管理",
          path: "/orders",
          key: "3"
        },
        {
          name: "提现管理",
          path: "/wd_records",
          key: "4"
        },
        {
          name: "举报管理",
          path: "/reports",
          key: "5"
        },
        {
          name: "消息提醒",
          path: "/msgs",
          key: "6"
        }
      ]
    };
  },
  methods: {
    signOut() {}
  }
};
</script>

<style scoped>
.header {
  height: 68px;
  min-width: 950px;
  padding: 0 30px;
  line-height: 68px;
  overflow: hidden;
}
.header .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 30px 16px 0;
  background: rgba(255, 255, 255, 0.2);
}
.admin-status {
  float: right;
  height: 100%;
  padding: 0 10px;
  vertical-align: middle;
}
.admin-status .ant-avatar,
.admin-status a {
  vertical-align: middle;
}
.admin-status a {
  padding: 0 6px;
  margin-left: 9px;
  color: rgba(255, 255, 255, 0.65);
}
.admin-status a:hover {
  color: #fff;
}
</style>

