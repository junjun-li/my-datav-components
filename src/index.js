import Test from './Test.vue'
import SvgIcon from './SvgIcon.vue'
import SvgAnimation from './components/SvgAnimation/index'
import LjjLoading from './components/LjjLoading/index'
import LjjFlyBox from './components/LjjFlyBox/index'
import LjjContainer from './components/LjjContainer/index'
import LjjCountTo from './components/LjjCountTo/index'
import LjjEcharts from './components/LjjEcharts/index'
import LjjBaseScrollList from './components/LjjBaseScrollList'

export default function (Vue) {
  Vue.use(LjjLoading)
  Vue.use(SvgAnimation)
  Vue.use(LjjFlyBox)
  Vue.use(LjjContainer)
  Vue.use(LjjCountTo)
  Vue.use(LjjEcharts)
  Vue.use(LjjBaseScrollList)
}
