<template>
  <div :id="id"
       class="ljj-base-scroll-list">
    <div :style="{
            backgroundColor: actualConfig.headerBg,
            height: `${actualConfig.headerHeight}px`,
            fontSize: `${actualConfig.headerFontSize}px`,
            color: actualConfig.headerColor
         }"
         class="base-scroll-list-header">
      <div v-for="(item,index) in headerData"
           :key="item+index"
           :align="aligns[index]"
           :style="{
             width: `${columnWidth[index]}px`,
             ...headerStyle[index],
           }"
           class="header-item base-scroll-list-text"
           v-html="item">
      </div>
    </div>
    <div :style="{
            height: `${height - actualConfig.headerHeight}px`
          }"
         class="base-scroll-list-wrapper">
      <div v-for="(rowItem,index) in currentRowData"
           :key="rowItem"
           :style="{
             height: `${rowHeights[index]}px`,
             lineHeight: `${rowHeights[index]}px`,
             background: index % 2 === 0 ? rowBg[0] : rowBg[1],
             fontSize: `${actualConfig.rowFontSize}px`,
             color: actualConfig.rowColor
           }"
           class="base-scroll-list-rows">
        <div v-for="(colItem, colIndex) in rowItem"
             :key="colIndex"
             :align="aligns[colIndex]"
             :style="{
               width: `${columnWidth[colIndex]}px`,
               ...rowStyle[colIndex],
             }"
             class="base-scroll-list-columns">
          {{ colItem }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { onMounted, ref } from 'vue'
import useScreen from '../../hooks/useScreen'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

const defaultConfig = {
  // 标题的数据 ['a', 'b', 'c']
  headerData: [],
  // 标题样式，格式：[{},{},{}]
  headerStyle: [],
  // 行样式
  rowStyle: [],
  // 标题的背景色
  headerBg: '#5A5A5A',
  // 标题的高度
  headerHeight: 35,
  // 标题是否展示序号
  headerIndex: false,
  // 插入的内容
  headerIndexContent: '#',
  headerIndexStyle: {
    width: '50px'
  },
  rowIndexStyle: {
    background: 'pink'
  },
  // 每一页的条数
  rowNum: 5,
  // 行背景色
  rowBg: [],
  // 文本对齐方式
  aligns: [],
  headerFontSize: 28,
  rowFontSize: 28,
  headerColor: '#333',
  rowColor: '#333',
  // 动画执行的间隔
  duration: 1000,
  // 每一次动画移动的位置 1格,2格
  moveNum: 2
}

export default {
  name: 'LjjBaseScrollList',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const headerData = ref([])
    const headerStyle = ref([])
    const rowStyle = ref([])
    const rowBg = ref([])
    const rowsData = ref([])
    const aligns = ref([])
    const id = `ljj-base-scroll-list-${uuid()}`
    const { width, height } = useScreen(id)
    // 默认的config配置
    // 合并之后的config
    const actualConfig = ref({})
    // 每一列的宽度
    const columnWidth = ref([])
    // 每一行的高度
    const rowHeights = ref([])
    // 每一页的条数
    const rowNum = ref(0)
    // 真正展示的数据
    const currentRowData = ref([])
    // 当前动画的指针 指当前动画到了哪一个元素
    const currentIndex = ref(0)
    let avgHeight
    const handleHeader = (config) => {
      // 拷贝一份数据
      const _headerData = cloneDeep(config.headerData)
      const _headerStyle = cloneDeep(config.headerStyle)
      const _rowStyle = cloneDeep(config.rowStyle)
      const _rowsData = cloneDeep(config.rowsData)
      const _aligns = cloneDeep(config.aligns)
      if (_headerData.length == 0) return
      // 如果表头之前要增加序号列
      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
        _rowStyle.unshift(config.rowIndexStyle)
        _aligns.unshift('center')
        _rowsData.forEach((item, index) => {
          item.unshift(index + 1)
        })
      }
      // 动态计算每一列的宽度
      let usedWidth = 0
      let usedColumnNum = 0
      // 判断是否自定义了宽度
      _headerStyle.forEach(itemStyle => {
        if (itemStyle.width) {
          // debugger
          let width = itemStyle.width.toString()
          usedWidth += (+width.replace('px', ''))
          usedColumnNum++
        }
      })
      const avgWidth = (width.value - usedWidth) / (_headerData.length - usedColumnNum)
      // console.log(avgWidth)
      // fill填充数组
      const _columnWidth = new Array(_headerData.length).fill(avgWidth)
      _headerStyle.forEach((itemStyle, index) => {
        if (itemStyle.width) {
          let width = +(itemStyle.width.toString().replace('px', ''))
          _columnWidth[index] = width
        }
      })
      columnWidth.value = _columnWidth
      // console.log(columnWidth)
      // 操作完所有的数据 一次性赋值, 减少dom重绘
      headerData.value = _headerData
      headerStyle.value = _headerStyle
      // rowsData.value = _rowsData.map((item, index) => ({
      //   data: item,
      //   rowIndex: index
      // }))
      rowsData.value = _rowsData
      rowStyle.value = _rowStyle
      aligns.value = _aligns
      console.log(rowsData.value)
    }
    const handleRows = (config) => {
      // 动态计算每一行数据的高度
      const { headerHeight } = config
      rowNum.value = config.rowNum
      const unusedHeight = height.value - headerHeight
      // debugger
      // 如果每一页的条数 rowNum 大于数据的总条数, 则rowNum = rowsData
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length
      }
      // 每一行的高度 = 除去header高度 / 每一页需要显示的高度
      avgHeight = unusedHeight / rowNum.value
      rowHeights.value = new Array(rowNum.value).fill(avgHeight)
      // 获取行背景色
      if (config.rowBg) {
        rowBg.value = config.rowBg
      }
    }

    const startAnimation = async () => {
      const config = actualConfig.value
      const { rowNum, moveNum, duration,  } = config
      const totalLength = rowsData.value.length
      // 如果数据条数小于需要显示的总条数 就不执行动画了
      if (totalLength < rowNum) return

      const index = currentIndex.value
      const _rowData = cloneDeep(rowsData.value)
      // 将数据进行收尾相连,
      // 如果数据是这样的 [1,2,3,4,5,6,7,8,9]
      // 隔一段时间 变成 [2,3,4,5,6,7,8,9,1]
      // 然后变成 [3,4,5,6,7,8,9,1,2]
      // debugger
      // 1. 先把index之后的数据取到
      const rows = _rowData.slice(index)
      // 2. 再往里面push index之前的数据
      rows.push(..._rowData.slice(0, index))
      currentRowData.value = rows
      // currentIndex ++
      currentIndex.value += moveNum
      // 判断是否到达最后一个元素
      // 因为moveNum不一定为1,所以重置的时候,不能把currentIndex直接赋值为0
      // 1 = 6 - 5 所以当前动画指针应该为1
      // debugger
      const isLast = currentIndex.value - totalLength
      if (isLast >= 0) {
        currentIndex.value = isLast
      }
      // 使用promise的方式 限制该回调的调用
      await new Promise(((resolve, reject) => setTimeout(resolve, duration)))
      await startAnimation()
    }
    onMounted(() => {
      const _actualConfig = assign(defaultConfig, props.config)
      // 如果开启了headerIndex, 就要提前赋值, 因为之后 要往这里面push一个新值
      const _rowsData = _actualConfig.rowsData ? cloneDeep(_actualConfig.rowsData) : []
      rowsData.value = _rowsData
      handleHeader(_actualConfig)
      handleRows(_actualConfig)
      actualConfig.value = _actualConfig
      startAnimation()
    })
    return {
      id,
      headerData,
      headerStyle,
      columnWidth,
      rowsData,
      rowHeights,
      rowStyle,
      rowBg,
      aligns,
      actualConfig,
      currentRowData,
      height
    }
  }
}
</script>

<style lang="scss"
       scoped>
.ljj-base-scroll-list {
  width: 100%;
  height: 100%;
  /*表头*/
  .base-scroll-list-header {
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  .base-scroll-list-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    box-sizing: border-box;
  }
  /*表内容*/
  .base-scroll-list-wrapper {
    overflow: hidden;
    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      /*动画*/
      transition: all 0.3s linear;
      .base-scroll-list-columns {
        font-size: 28px;
      }
    }
  }

}
</style>