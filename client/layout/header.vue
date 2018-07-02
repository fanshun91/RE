<template>
  <header class="comm-header">
    <h1 class="header-logo">{{ logoInfo }}</h1>
    <ul class="com-navbar">
      <li :class="['com-nav-item', currNavSite === 'user' ? 'header-nav-active' : '']">
        <router-link to="/user" tag="a">{{navItemNames.userLk}}</router-link>
      </li>
      <li :class="['com-nav-item', currNavSite === 'content' ? 'header-nav-active' : '']">
        <router-link to="/rp_notice" tag="a">{{navItemNames.contentLk}}</router-link>
      </li>
      <li :class="['com-nav-item', currNavSite === 'order' ? 'header-nav-active' : '']">
        <router-link to="/order" tag="a">{{navItemNames.orderLk}}</router-link>
      </li>
      <li :class="['com-nav-item', currNavSite === 'withdraw' ? 'header-nav-active' : '']">
        <router-link to="/wd_record" tag="a">{{navItemNames.withdrawLk}}</router-link>
      </li>
      <li :class="['com-nav-item', currNavSite === 'tips' ? 'header-nav-active' : '']">
        <router-link to="/tips" tag="a">{{navItemNames.tipsLk}}</router-link>
      </li>
      <li :class="['com-nav-item', currNavSite === 'msgs' ? 'header-nav-active' : '']">
        <router-link to="/msg" tag="a">{{navItemNames.msgLk}}</router-link>
      </li>
    </ul>
    <ul class="com-user-setting">
      <li class="com-nav-item">
        <a class="user-proInfo" href="javascript:;">
          <img src="../assets/images/sun.jpg">
          <span class="user-name">{{getUserName()}}</span>
          <!-- <span class="prom-arrow"></span> -->
        </a>
      </li>
      <li class="com-nav-item">
        <a href="javascript">退出</a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  props: {
    currNavSite: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logoInfo: "小鱼头条后台",
      navItemNames: {
        userLk: "用户管理",
        contentLk: "内容管理",
        orderLk: "订单管理",
        withdrawLk: "提现管理",
        tipsLk: "举报管理",
        msgLk: "消息提醒"
      }
    };
  },
  methods: {
    getUserName() {
      return "ruisun";
    }
  }
};
</script>

<style scoped>
/* 主体部分的CSS */
.comm-header {
  position: relative;
  z-index: 999;
  height: 80px;
  background-color: #23262e;
}
.header-logo {
  position: absolute;
  left: 0;
  top: 0;
  width: 180px;
  height: 100%;
  line-height: 80px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #7dbbb5;
}

@media screen and (max-width: 900px) {
  .header-logo {
    display: none;
  }

  .com-navbar {
    left: 0;
  }
}

/* 导航区域的CSS */
.com-navbar,
.com-user-setting {
  position: absolute;
  top: 0;
  height: 80px;
  padding: 0 20px;
  font-size: 0;
}
.com-navbar {
  left: 180px;
}
.com-user-setting {
  right: 0;
}
.com-nav-item {
  float: left;
  /* display: inline-block; */
  height: 100%;
  line-height: 80px;
  vertical-align: middle;
}
.com-nav-item * {
  font-size: 15px;
  color: #f6f6f6;
}
.com-nav-item a {
  display: inline-block;
  width: inherit;
  height: 100%;
  padding: 0 16px;
}
.com-nav-item a:hover {
  background-color: rgba(95, 96, 102, 0.7);
}

/* 用户相关的CSS */
.user-proInfo {
  position: relative;
  display: block;
}
.user-proInfo img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  vertical-align: middle;
}
.user-name {
  margin: 0 8px 0 6px;
  font-size: 16px;
}
/* .prom-arrow {
  content: "";
  position: absolute;
  top: 50%;
  right: 3px;
  width: 0;
  height: 0;
  margin-top: -3px;
  border-width: 6px;
  border-style: solid dashed dashed;
  border-color: #fff transparent transparent;
  border-top-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-transition: all 0.3s ease;
}
.user-proInfo:hover .prom-arrow {
  margin-top: -9px;
  border-style: dashed dashed solid;
  border-color: transparent transparent #fff;
} */

.com-user-setting .com-nav-item {
  margin-right: 3px;
}
.com-user-setting a:hover {
  background-color: rgba(95, 96, 102, 0.3);
}
.header-nav-active {
  height: 76px;
  border-bottom: 4px solid #009968;
}
</style>
