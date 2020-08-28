import Test from './Test.vue'
import SvgIcon from './SvgIcon.vue'
import SvgAnimation from './components/SvgAnimation/index'
import LjjLoading from './components/LjjLoading/index'
import LjjFlyBox from './components/LjjFlyBox/index'

export default function (Vue) {
  Vue.use(LjjLoading)
  Vue.use(SvgAnimation)
  Vue.use(LjjFlyBox)
}
