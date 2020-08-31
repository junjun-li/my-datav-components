<template>
  <div class="ljj-container"
       ref="ljjContainer">
    <template v-if="ready">
      <slot></slot>
    </template>

  </div>
</template>

<script>
import { getCurrentInstance, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '../../utils/index'

export default {
  name: 'LjjContainer',
  props: {
    options: Object
  },
  setup(ctx) {
    // 缩放比的计算
    // 可视区的宽高 / dom自身的宽高
    const width = ref(0)
    const height = ref(0)
    // 视口的宽高, 屏幕的宽高
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    const ready = ref(false)
    let context, dom, observer
    // init 判断是否传入宽高, 没有传入, 就使用视口的宽高
    const initSize = () => {
      return new Promise((resolve, reject) => {
        nextTick(() => {
          dom = context.$refs['ljjContainer']
          // 获取大屏的真实尺寸 如果传入了 就使用传入的尺寸, 没有传入 就使用dom自身的宽高
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 防止重复赋值
          // 获取画布的尺寸
          if (!originalWidth.value || !originalHeight.value) {
            // 返回屏幕的宽度和高度 (屏幕的宽高, 屏幕的宽高, 屏幕的宽高 包括上面的导航栏)
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
          resolve()
        })
      })

    }
    // 修改容器的高度和宽度 如果传入了 就使用传入的宽高, 如果没有传, 就使用容器本身的宽高
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }
    // 设置scale,
    const updateScale = () => {
      // 这个是body可视区的宽高 真实的视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 设置大屏最终的宽高
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value
      // 计算比值
      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`)
    }
    // 页面改变之后, 修改宽高和scale
    const onResize = async () => {
      await initSize()
      updateScale()
      console.log('onResize')
    }
    // 初始化MutationObserve 这个用于, 直接修改dom的style属性的宽高, 然后在触发重新渲染
    const initMutationObServer = () => {
      observer = new MutationObserver(onResize)
      observer.observe(dom, {
        attributes: true, // 设为 true 以观察受监视元素的属性值变更。默认值为 false。
        attributeFilter: ['style'], // 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。
        attributeOldValue: true // 当监视节点的属性改动时，将此属性设为 true 将记录任何有改动的属性的上一个值。
      })
    }
    // 移出监听
    const removeMutationObServe = () => {
      if (observer) {
        observer.disconnect()
        observer.takeRecords()
        observer = null
      }
    }
    onMounted(async () => {
      ready.value = false
      context = getCurrentInstance().ctx
      await initSize()
      updateSize()
      updateScale()
      window.addEventListener('resize', debounce(100, onResize))
      initMutationObServer()
      ready.value = true
    })
    onUnmounted(() => {
      window.removeEventListener('resize', onResize),
      removeMutationObServe()
    })
    return {
      width,
      height,
      ready
    }
  }
}
</script>

<style lang="scss"
       scoped>
.ljj-container {
  position: fixed;
  top: 0;
  left: 0;
  //right: 0;
  //bottom: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
