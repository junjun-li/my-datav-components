<template>
  <div :class="[className, 'ljj-echarts']"></div>
</template>

<script>
import { onMounted, watch } from 'vue'
import echarts from 'echarts'
import { v4 as uuid } from 'uuid'

export default {
  name: 'LjjEcharts',
  props: {
    options: Object
  },
  setup(ctx) {
    let dom, chart
    let className = `echarts${uuid()}`
    const initChart = () => {
      dom = document.querySelectorAll(`.${className}`)[0]
      chart = echarts.init(dom)
      chart.setOption(ctx.options)
    }
    onMounted(() => {
      initChart()
    })
    watch(() => ctx.options, () => {
      initChart()
    })
    return {
      className
    }
  }
}

</script>

<style lang="scss"
       scoped>
.ljj-echarts {
  width: 100%;
  height: 100%;
}
</style>