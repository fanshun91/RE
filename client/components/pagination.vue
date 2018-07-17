<template>
  <a-pagination
    showQuickJumper
    :defaultCurrent="1"
    :pageSize="pageSize"
    :total="total"
    :showTotal="total => `总计 ${total} 条`"
    style="text-align: center"
    v-model="current"
    @change="onChange"
  />
</template>

<script>
export default {
  data() {
    return {
      pageSize: 20,
      current: 1,
      total: 200
    };
  },
  methods: {
    onChange(pageNumber) {
      console.log(pageNumber);
    }
  }
};
</script>
