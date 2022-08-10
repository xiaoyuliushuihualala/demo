<template>
  <div class="container">
    <div class="text">{{ state.time }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  setup() {
    const state = reactive({
      time: dayjs().format("HH:mm:ss"),
    });
    const refreshTime = () => {
      state.time = dayjs().format("HH:mm:ss");
    };
    onMounted(() => {
      setInterval(() => {
        refreshTime();
      }, 1000);
    });
    return {
      state,
    };
  },
});
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;

  .text {
    font-size: 48px;
    color: #1890ff;
    font-family: Digital;
    -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent
          50%, rgba(255, 255, 255, 0.3));
    text-decoration: blink;
  }
}
</style>
