<template>
  <div class="ljj-fly-box"
       ref="ljjFlyBox">
    <svg :height="height"
         :width="width"
         stroke="#000">
      <path :d="path"
            :stroke="lineColor"
            fill="none"
            stroke-width="1"></path>
      <radialGradient :id="radialGradientId"
                      cx="50%"
                      cy="50%"
                      fx="100%"
                      fy="50%"
                      r="50%">
        <stop offset="0%"
              stop-color="#fff"
              stop-opacity="1"></stop>
        <stop offset="100%"
              stop-color="#fff"
              stop-opacity="0"></stop>
      </radialGradient>
      <!--
      定义蒙版
      -->
      <mask :id="maskId">
        <circle :fill="`url(#${radialGradientId})`"
                :r="starLength"
                cx="0"
                cy="0">
          <animateMotion :dur="`${duration}s`"
                         :path="path"
                         repeatCount="indefinite"
                         rotate="auto"/>
        </circle>
      </mask>
      <!--
        我自己对蒙版的理解
        mask="url(#fly-box-mask)"
        只要增加了 上述属性 那个元素就会被蒙起来 只有与mack元素相重叠的 才会显示出来
      -->
      <path :d="path"
            :mask="`url(#${maskId})`"
            :stroke="starColor"
            fill="none"
            stroke-width="3"></path>
      <!--      <defs>-->
      <!--        <path :d="path"-->
      <!--              fill="none"-->
      <!--              id="fly-box-path"/>-->
      <!--        <mask id="fly-box-mask">-->
      <!--          &lt;!&ndash;在蒙版中绘制一个圆形&ndash;&gt;-->
      <!--          &lt;!&ndash;通过蒙版,绘制了一个半径是150的小球&ndash;&gt;-->
      <!--          &lt;!&ndash;这个和第二个圆交叉的部分就会显示出来&ndash;&gt;-->
      <!--          <circle cx="0"-->
      <!--                  cy="0"-->
      <!--                  fill="white"-->
      <!--                  r="20">-->
      <!--            <animateMotion-->
      <!--                dur="3s"-->
      <!--                :path="path"-->
      <!--                repeatCount="indefinite"-->
      <!--                rotate="auto"-->
      <!--            />-->
      <!--          </circle>-->
      <!--        </mask>-->
      <!--      </defs>-->
      <!--      <use href="#fly-box-path"-->
      <!--           stroke="#235fa7"-->
      <!--           stroke-width="1"/>-->
      <!--      &lt;!&ndash;实际看见的流星, 是外层蒙版的一个path&ndash;&gt;-->
      <!--      <use href="#fly-box-path"-->
      <!--           mask="url(#fly-box-mask)"-->
      <!--           stroke="#4fd2dd"-->
      <!--           stroke-width="3"/>-->
    </svg>
    <div class="ljj-fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

export default {
  name: 'LjjFlyBox',
  props: {
    //外框的颜色
    lineColor: {
      type: String,
      default: '#235fa7'
    },
    // 流星的颜色
    starColor: {
      type: String,
      default: '#4fd2dd'
    },
    // 流星的长度
    starLength: {
      type: [String, Number],
      default: 50
    },
    // 动画的速度
    duration: {
      type: [Number, String],
      default: 3
    }
  },
  setup(ctx) {
    const uuid = uuidv4()
    const maskId = `mask-${uuid}`
    const radialGradientId = `radialGradient-${uuid}`
    const width = ref(0)
    const height = ref(0)
    const path = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`)
    onMounted(() => {
      // 因为setup在vue实例之前调用, 获取不到运行时的dom
      // vue提供了一个 getCurrentInstance的方法来获取ref的值
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs['ljjFlyBox']
      height.value = dom.clientHeight
      width.value = dom.clientWidth
    })
    return {
      width,
      height,
      path,
      maskId,
      radialGradientId
    }
  }
}
</script>

<style lang="scss"
       scoped>
.ljj-fly-box {
  position: relative;
  height: 100%;
  width: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .ljj-fly-box-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
