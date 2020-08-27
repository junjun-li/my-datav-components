<template>
  <!--  stroke-width线的粗细  -->
  <!--
    currentColor: 继承父盒子的color颜色
  -->
  <div>
    <svg height="200"
         style="border: 1px solid #000000"
         viewBox="0 0 50 20"
         width="500">
      <rect height="5"
            style="stroke: #000000; fill:none;"
            width="10"
            x="20"
            y="10"/>
    </svg>
    <svg height="200"
         style="border: 1px solid #000000"
         width="500">
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="200"
            y="100"/>
    </svg>
    <!--
      来看看第二个参数 slice 如果设置了 将采用较大的压缩比
      1. 500 / 200 = 2.5
         200 / 200 = 1
      2. viewBox 各乘以2.5 viewBox = 500 * 500
      3. 根据YMax,view的Y轴的最大将和viewport的Y轴最大重合
      4. 再根据viewBox的位置,把rect绘制出来
         内部的rect每一个属性都要乘以2.5, 最终会绘制出一个250*125的矩形
         width="100 * 2.5"
         height="50 * 2.5"
         x="100 * 2.5" 距离viewBox X轴的 250位置绘制
         y="100 * 2.5" 距离viewBox Y轴的 250位置绘制
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMax slice"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="0"
            y1="0"
            y2="200"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="200"
            y1="200"
            y2="200"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="200"
            x2="200"
            y1="0"
            y2="200"></line>
      <rect height="50"
            style="stroke: #000000; fill:none;stroke-width:1"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <!--
      示例代码原理
      1. viewBox的宽高是200*200
      2. 缩放比例 因为是meet模式,所以使用1为缩放比例
        500 / 200 = 2.5
        200 / 200 = 1
      3. 内部的所有元素 根据viewBox的位置,乘以缩放比例1显示
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMid meet"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <line style="stroke:blue;stroke-width:20"
            x1="0"
            x2="250"></line>
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <!--
      现在反过来看看 可以试着修改 YMin YMid YMax 查看变化
      1. viewBox的宽高是 500*100, 先确定viewBox的位置,大小
      2. 缩放比例 因为是meet模式,取小的缩放比例 1
        500 / 500 = 1
        200 / 100 = 2
      3. 内部所有的元素,先定好viewBox的距离,乘以缩放比例1
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMin meet"
         style="border: 1px solid #000000"
         viewBox="0 0 500 100"
         width="500">
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="0"
            y1="0"
            y2="100"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"
            y1="100"
            y2="100"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="500"
            x2="500"
            y1="0"
            y2="100"></line>
      <rect height="50"
            stroke-width="1"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <svg height="200"
         preserveAspectRatio="none"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
  </div>

</template>
<script>
export default {
  name: 'SvgIcon'
}
</script>

<style
    lang="scss"
    scoped>
.test {
  color: pink;
}
</style>
