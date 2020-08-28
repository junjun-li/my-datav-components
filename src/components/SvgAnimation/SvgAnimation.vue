<template>
  <div class="svg-animation">
    <div class="container">
      <svg height="200"
           viewBox="0 0 500 200"
           width="500">
        <rect class="rect"
              fill="none"
              height="50"
              stroke="blue"
              stroke-width="5"
              width="100"
              x="5"
              y="5"/>
      </svg>
    </div>
    <!--css 环形进度条-->
    <!--
      使用 stroke-dasharray 制作环形进度条的原理
      每次增加 stroke-dasharray 的值 形成动画
    -->
    <div class="container">
      <svg height="440"
           viewBox="0 0 440 440"
           width="440">
        <!--
          cx="100" cy="100"圆心的位置
          r="100" 半径
          stroke-width 边框
          2*3.14159*180 = 1130.9723999999999
        -->
        <circle cx="220"
                cy="220"
                fill="none"
                r="170"
                stroke="#D1D3D7"
                stroke-width="20"></circle>
        <circle
            class="circle"
            cx="220"
            cy="220"
            fill="none"
            r="170"
            stroke="#00A5E0"
            stroke-width="20"
        />
      </svg>
    </div>
    环形方形
    <div class="container">
      <svg height="200"
           viewBox="0 0 200 200"
           width="200">
        <rect fill="none"
              height="200"
              stroke="grey"
              stroke-width="8"
              width="200"
              x="0"
              y="0"></rect>
        <rect class="rect"
              fill="none"
              height="200"
              stroke="blue"
              stroke-width="8"
              transform="matrix(0,1,-1,0,200,0)"
              width="200"
              x="0"
              y="0"></rect>
      </svg>
    </div>
    logo描边动画
    <div class="container">
      <svg
          height="200"
          p-id="2964"
          t="1598447292998"
          version="1.1"
          viewBox="0 0 1024 1024"
          width="200"
          xmlns="http://www.w3.org/2000/svg">
        <path class="logo"
              d="M322.749752 745.237065c74.987878 0 149.936871-47.355541 208.79642-123.163087-83.736123-40.35715-154.673755-69.230758-231.311203-61.753459-20.720927 2.034333-59.624982 11.099802-80.896449 29.652343-63.759139 54.903447-25.614377 155.264203 103.411232 155.264203zM160.016437 64.021106h703.966103c53.016471 0 95.995331 42.97886 95.995331 95.995331v703.966103c0 53.016471-42.97886 95.995331-95.995331 95.995331H160.016437c-53.016471 0-95.995331-42.97886-95.995331-95.995331V160.016437c0-53.016471 42.97886-95.995331 95.995331-95.995331z m735.964888 600.388073V160.016437c0-17.672498-14.326287-31.998785-31.998785-31.998785H160.016437c-17.672498 0-31.998785 14.326287-31.998785 31.998785v703.966103c0 17.672498 14.326287 31.998785 31.998785 31.998785h703.966103c17.672498 0 31.998785-14.326287 31.998785-31.998785V784.602631c-64.164369-26.708292-209.505571-87.783299-292.64613-127.259382-73.051783 88.768743-167.301354 142.641721-265.137613 142.641721-165.469636 0-221.660402-142.991692-143.308917-237.131768 17.076934-20.521383 46.147016-40.116673 91.247191-51.093679 70.545706-17.113773 182.841282 10.679223 288.069904 44.970214 18.914792-34.440393 34.853809-72.354911 46.715975-112.724341H296.610418v-32.458249h167.223583v-58.144258H261.292028v-32.457226h202.541973v-82.95534s0-13.977339 14.329356-13.97734h81.733513v96.93268h200.257953v32.457226H559.89687v58.144258h163.467025c-15.637142 63.282279-39.414685 121.517611-69.210291 172.657338 49.595558 17.72264 94.132914 34.505885 127.311571 45.469588 56.590879 18.723434 92.449575 29.05064 114.51615 34.735106z"
              id="logo"
              p-id="2965"></path>
      </svg>
    </div>
    SMIL动画
    <div class="container">
      <svg height="400"
           width="400">
        <rect fill="red"
              height="100"
              width="100"
              x="0"
              y="0">
          <set attributeName="x"
               attributeType="XML"
               begin="1s"
               to="10"/>
          <set attributeName="x"
               attributeType="XML"
               begin="2s"
               to="20"/>
          <set attributeName="x"
               attributeType="XML"
               begin="3s"
               to="30"/>
          <set attributeName="x"
               attributeType="XML"
               begin="4s"
               to="40"/>
          <set attributeName="x"
               attributeType="XML"
               begin="5s"
               to="50"/>
        </rect>
      </svg>
    </div>
    补间动画 小球滚动
    <div class="container">
      <svg height="200"
           viewBox="0 0 500 200"
           width="500">
        <circle cx="0"
                cy="0"
                fill="blue"
                r="30"
                stroke="black"
                stroke-width="1">
          <!--
            attributeType="XML"表示监听dom元素
            attributeType="css"表示监听css属性
            fill="freeze" 表示动画结束后的位置 remove默认值 动画结束之后回归原位
            repeatCount="indefinite"
          -->
          <animate attributeName="cx"
                   dur="1s"
                   fill="freeze"
                   from="0"
                   to="100"/>
          <animate attributeName="cy"
                   dur="1s"
                   fill="freeze"
                   from="0"
                   to="100"/>
        </circle>
      </svg>
    </div>
    形状补间动画
    <div class="container">
      <svg height="400"
           width="400">
        <polygon fill="#fcc"
                 points="30 30 70 30 90 70 10 70"
                 stroke="black">
          <animate attributeName="points"
                   attributeType="XML"
                   dur="5s"
                   fill="freeze"
                   repeatCount="1"
                   to="50 30 70 50 50 90 30 50"/>
        </polygon>
      </svg>
    </div>
    <div class="container">
      <svg height="200"
           viewBox="0 0 200 200"
           width="200">
        <rect fill="red"
              height="60"
              width="60"
              x="0"
              y="0">
          <!--
            type: 指的是transform中的type
          -->
          <animateTransform attributeName="transform"
                            begin="0s"
                            dur="3s"
                            from="1"
                            repeatCount="indefinite"
                            to="2"
                            type="scale"/>
        </rect>
      </svg>
    </div>
    轨迹动画
    <div class="container">
      <svg height="200"
           width="200">
        <rect fill="red"
              height="10"
              width="10"
              x="0"
              y="0">
          <animateMotion dur="5s"
                         fill="freeze"
                         path="M10 10 L110 10 L110 110 L10 110 Z"
                         repeatCount="2"
                         rotate="0">
            <!--
              这个小正方形会沿着path进行运动, 做轨迹动画
              rotate: 转弯的时候, 更圆润的进行转弯
              repeatCount: 动画进行的次数
              fill: 动画结束之后, 小球最终的距离
            -->
          </animateMotion>
        </rect>
        <path d="M10 10 L110 10 L110 110 L10 110 Z"
              fill="none"
              stroke="green"></path>
      </svg>
    </div>
    轨迹动画, 做一个不闭合的 原路返回的动画
    <div class="container">
      <svg height="200"
           width="200">
        <rect fill="red"
              height="10"
              width="10"
              x="0"
              y="0">
          <animateMotion begin="0;backward-rect.end + 0.5"
                         dur="2s"
                         fill="freeze"
                         id="forward-rect"
                         path="M10 10 L110 10 L110 110 L10 110"
                         rotate="0"/>
          <animateMotion begin="forward-rect.end + 0.5"
                         dur="2s"
                         fill="freeze"
                         id="backward-rect"
                         path="M10 110 L110 110 L110 10 L10 10"
                         rotate="0"/>
          <animate attributeName="fill"
                   attributeType="XML"
                   begin="0;blue-to-red.end + 0.5s"
                   dur="2s"
                   fill="freeze"
                   from="red"
                   id="red-to-blue"
                   to="blue"/>
          <animate attributeName="fill"
                   attributeType="XML"
                   begin="red-to-blue.end + 0.5"
                   dur="2s"
                   fill="freeze"
                   from="blue"
                   id="blue-to-red"
                   to="red"/>
        </rect>
        <path d="M10 10 L110 10 L110 110 L10 110 "
              fill="none"
              stroke="green"></path>
      </svg>
    </div>
    mask 蒙版的概念详解 蒙版的基本使用
    <div class="container">
      <svg height="400"
           width="400">
        <mask id="test-mask">
          <rect fill="yellow"
                height="50"
                width="50"
                x="10"
                y="10"/>
        </mask>
        <!--线性渐变-->
        <linearGradient id="test-linear-gradient">
          <stop offset="0%"
                stop-color="red"
                stop-opacity="1"/>
          <stop offset="50%"
                stop-color="green"/>
          <stop offset="100%"
                stop-color="blue"
                stop-opacity="0"/>
        </linearGradient>
        <!--圆形渐变-->
        <!--
          表示内圈的范围
          fx=""
          fy=""
          表示外圈的范围
          cx=""
          cy=""
          r 表示辐射半径
        -->
        <radialGradient cx="30%"
                        cy="50%"
                        fx="25%"
                        fy="75%"
                        id="test-radial-gradient"
                        r="50%">
          <stop offset="0%"
                stop-color="white"/>
          <stop offset="10%"
                stop-color="yellow"/>
          <stop offset="95%"
                stop-color="red" stop-opacity="1.5"/>
        </radialGradient>
        <!--        <rect fill="url(#test-radial-gradient)"-->
        <!--              height="390"-->
        <!--              width="390"-->
        <!--              x="5"-->
        <!--              y="5"/>-->
        <circle cx="200"
                cy="200"
                fill="url(#test-radial-gradient)"
                r="150"/>
        <!--        <rect fill="blue"-->
        <!--              height="390"-->
        <!--              mask="url(#test-mask)"-->
        <!--              width="390"-->
        <!--              x="5"-->
        <!--              y="5"/>-->
      </svg>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'SvgAnimation',
  setup() {
    onMounted(() => {
      const logo = document.getElementById('logo')
      console.log(logo.getTotalLength())
    })
  }
}
</script>

<style lang="scss"
       scoped>
.svg-animation {
  font-size: 20px;
  font-weight: 700;
}
.container {
  svg {
    border: 1px solid #000;
  }
  .rect {
    /* 先绘制 10px实线 在绘制20px虚线 最后绘制30px实线 以此类推*/
    stroke-dasharray: 10 20 30;
  }

}
.circle {
  /*linear匀速的动画*/
  /*指定circle动画
  5秒运行完毕
  linear匀速的进行运动
  infinite无线循环*/
  animation: circle 5s linear infinite;
  //stroke-dasharray: 10 1131;
}
/*这种动画叫做补间动画*/
@keyframes circle {
  /*补间动画 开始状态*/
  from {
    stroke-dasharray: 0 1131;
  }
  // 补间动画 结束状态
  to {
    stroke-dasharray: 1131 0;
  }
}
.rect {
  animation: rectAn 5s linear infinite;
}
@keyframes rectAn {
  /*补间动画 开始状态*/
  from {
    stroke-dasharray: 0 800;
  }
  // 补间动画 结束状态
  to {
    stroke-dasharray: 800 0;
  }
}
/*logo动画*/
.logo {
  fill: none;
  stroke: #333;
  stroke-width: 5;
  /*
    linear匀速
    infinite无限
    执行1次
    forwards 维持动画最后的状态
  */
  animation: logoAnimation 6s linear 1 forwards;
}
@keyframes logoAnimation {
  /*
  from {
    stroke-dasharray: 11060;
    stroke-dashoffset: 11060;
  }
  to {
    stroke-dasharray: 11060;
    stroke-dashoffset: 0;
  }
   */
  0% {
    fill: white;
    stroke-dasharray: 11060;
    stroke-dashoffset: 11060;
  }
  50% {
    fill: white;
    stroke-dasharray: 11060;
    stroke-dashoffset: 0;
  }
  75% {
    fill: red;
    stroke: white;
  }
  100% {
    fill: blue;
    stroke: white;
  }
}
</style>
