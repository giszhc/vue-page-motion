import TransitionRouterView from './TransitionRouterView.vue'
import type {App} from 'vue'

// 导出类型定义
export type {TransitionRouterViewProps} from './types'

// 导出组件
export {TransitionRouterView}

// 默认导出插件安装对象
export default {
    install(app: App) {
        app.component('TransitionRouterView', TransitionRouterView)
    }
}