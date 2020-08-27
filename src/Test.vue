<template>
  <div class="test">
    <div>{{ message }}</div>
    <div>doubleCount:{{ doubleCount }}</div>
    <div><button @click="add">点击增加</button></div>
    <h1>这是我做的组件库哟</h1>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'TestComponent',
  setup() {
    let message = 'hello vue3'
    let count = ref(1)
    let doubleCount = computed(() => count.value + 10)
    let add = () => {
      count.value++
    }
    return {
      message,
      doubleCount,
      add
    }
  },
}
</script>

<style scoped
       lang="scss">
.test {
  color: pink;
}
</style>
