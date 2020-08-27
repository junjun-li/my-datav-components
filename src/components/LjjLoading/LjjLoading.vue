<template>
  <div class="ljj-loading">
    <!--开始开发我们的第一个组件 Loading-->
    <svg :height="height"
         :width="width"
         preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 50 50">
      <!--
        stroke-dasharray: 34像素能看见 34像素看不见
        stroke-linecap: 使边角更柔和 边缘部分的绘图策略
        因为希望两节能看见, 两节看不见, 圆的周长 除以4
        stroke-dasharray= 2πR / 4
        2 * 3.14 * 22 / 4 = 34.54
      -->
      <circle :stroke="outSideColor"
              cx="25"
              cy="25"
              fill="none"
              r="22"
              stroke-dasharray="34"
              stroke-linecap="round"
              stroke-width="3">
        <!--加入动画 动画作用域 只作用于当前父级dom元素中-->
        <!--
          repeatCount="indefinite" 无限循环
          from="0 25 25" 参数二三: 动画的中心点
          这个可以简写 使用 values
          from="0 25 25"
          to="360 25 25"
        -->
        <animateTransform attributeName="transform"
                          :dur="`${duration}s`"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 25 25;360 25 25"/>
        <animate :values="outSideColorAnimation "
                 attributeName="stroke"
                 :dur="`${+duration * 2}s`"
                 repeatCount="indefinite"/>
      </circle>
      <circle :stroke="inSideColor"
              cx="25"
              cy="25"
              fill="none"
              r="12"
              stroke-dasharray="19"
              stroke-linecap="round"
              stroke-width="3">
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          :dur="`${duration}s`"
                          from="360 25 25"
                          repeatCount="indefinite"
                          to="0 25 25"
                          type="rotate"/>
        <animate :values="inSideColorAnimation"
                 attributeName="stroke"
                 :dur="`${+duration * 2}s`"
                 repeatCount="indefinite"/>
      </circle>
    </svg>
    <div class="ljj-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'LjjLoading',
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outSideColor: {
      type: String,
      default: '#3be6cb'
    },
    inSideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    }
  },
  setup(ctx) {
    const outSideColorAnimation = computed(() => `${ctx.outSideColor};${ctx.inSideColor};${ctx.outSideColor}`)
    const inSideColorAnimation = computed(() => `${ctx.inSideColor};${ctx.outSideColor};${ctx.outSideColor};`)
    return {
      outSideColorAnimation,
      inSideColorAnimation
    }
  }
}
</script>

<style scoped>

</style>
