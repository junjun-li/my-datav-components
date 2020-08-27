import Test from './Test.vue'
import SvgIcon from './SvgIcon.vue'
import SvgAnimation from './components/SvgAnimation/index'
import LjjLoading from './components/LjjLoading/index'


export default function (Vue) {
  // Vue.component(Test.name, Test)
  // Vue.component(SvgIcon.name, SvgIcon)
  // Vue.component(SvgAnimation.name, SvgAnimation)
  Vue.use(LjjLoading)
  Vue.use(SvgAnimation)
}
