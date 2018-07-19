<template>
  <a-breadcrumb style="margin: 16px 2px">
    <a-breadcrumb-item>{{curPage}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  props: ["curPage"]
};
</script>
