<template>
  <a-layout-sider width="180" style="background: #fff">
    <a-menu
      mode="inline"
      :defaultSelectKeys="['1']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item v-for="i in list" :key="i.key">
        <router-link :to="i.path" tag="a"><a-icon type="right" />{{i.name}}</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  props: ["list"]
};
</script>
