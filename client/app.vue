<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations
  // mapActions
} from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    // this.testFunction("0.0.4");
  },
  metaInfo: {
    title: "小鱼头条后台管理系统"
  },
  computed: {
    ...mapState(["version"]),
    ...mapGetters(["showVersion"])
  },
  methods: {
    // ...mapMutations(["testFunction"])
    // ...mapActions
  }
};
</script>


