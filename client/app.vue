<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store);
  },
  computed: {
    ...mapState(["version"]),
    ...mapGetters(["showVersion"])
  }
};
</script>


