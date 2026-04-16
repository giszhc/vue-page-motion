/** 路由切换方向 */
export type Direction = 'forward' | 'back'

/** 内置动画类型 */
export type BuiltinTransition = 'slide-left' | 'slide-right'

/** TransitionRouterView 组件属性配置 */
export interface TransitionRouterViewProps {
    /** 过渡模式：'in-out'（新元素先进入）或 'out-in'（旧元素先离开），默认 'out-in' */
    mode?: 'in-out' | 'out-in'
    
    /** 包裹元素的 CSS 类名，默认 'transition-router-view' */
    wrapperClass?: string

    /** 是否启用 KeepAlive 缓存，默认 false */
    keepAlive?: boolean
    
    /** KeepAlive 包含的组件名称（字符串、正则或数组） */
    include?: string | RegExp | (string | RegExp)[]
    
    /** KeepAlive 排除的组件名称（字符串、正则或数组） */
    exclude?: string | RegExp | (string | RegExp)[]

    /** 
     * 过渡动画策略：
     * - 字符串：固定使用指定的过渡名称（支持 'slide-left' | 'slide-right' 或自定义）
     * - 函数：根据路由和方向动态返回过渡名称
     * - undefined：使用默认的 slide-left 动画
     */
    transition?: BuiltinTransition | string | ((route: any, direction: Direction) => BuiltinTransition | string) | undefined
}