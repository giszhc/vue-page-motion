# @giszhc/vue-page-motion

一个轻量、优雅的 Vue3 路由页面过渡动画组件。

## ✨ 特性

* 💾 **KeepAlive 支持** - 可选的组件缓存，保持页面状态
* 🎯 **灵活动画策略** - 支持固定动画、动态函数、route.meta 配置
* 📦 **开箱即用** - 内置 slide-left 滑动动画，零配置即可使用
* 🛡️ **类型安全** - 完整 TypeScript 支持
* ⚡ **轻量无依赖** - 仅依赖 Vue 和 Vue Router

---
## 在线示例

我们提供了一个功能完整的在线演示页面，您可以直接在浏览器中体验所有功能：

**🌐 立即体验：** [点击访问在线演示](https://giszhc.github.io/vue-page-motion/)

---

## 安装

```bash
pnpm install @giszhc/vue-page-motion
```

## 使用

### 方式一：直接引入

```js
import { TransitionRouterView } from '@giszhc/vue-page-motion'
import '@giszhc/vue-page-motion/dist/index.css'
```

```vue
<template>
  <TransitionRouterView />
</template>

<script setup>
import { TransitionRouterView } from '@giszhc/vue-page-motion'
</script>
```

### 方式二：插件安装（use）

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import VuePageMotion from '@giszhc/vue-page-motion'
import '@giszhc/vue-page-motion/dist/index.css'

const app = createApp(App)
app.use(VuePageMotion)
app.mount('#app')
```

```vue
<!-- 任意组件中直接使用 -->
<template>
  <TransitionRouterView />
</template>
```

就这么简单！现在你的应用已经具备了左右滑动的页面过渡效果。

## 组件参数

- **mode**：过渡模式，`in-out`（新元素先进入）或 `out-in`（旧元素先离开），默认 `'out-in'`
- **wrapperClass**：包裹元素的 CSS 类名，默认 `'transition-router-view'`
- **keepAlive**：是否启用 KeepAlive 缓存，默认 `false`
- **include**：KeepAlive 包含的组件名称（字符串、正则或数组）
- **exclude**：KeepAlive 排除的组件名称（字符串、正则或数组）
- **transition**：过渡动画策略
  - 字符串：固定使用指定的过渡名称（支持 `'slide-left'` | `'slide-right'` 或自定义）
  - 函数：根据路由和方向动态返回过渡名称
  - undefined：使用默认的 `slide-left` 动画

## 内置动画

组件提供两种内置滑动动画：

- **slide-left**（默认）：从右向左滑动（新页面从右侧滑入）
- **slide-right**：从左向右滑动（新页面从左侧滑入）

### 使用示例

```vue
<!-- 默认使用 slide-left -->
<TransitionRouterView />

<!-- 指定使用 slide-right -->
<TransitionRouterView transition="slide-right" />

<!-- 使用 route.meta 覆盖 -->
<!-- 路由配置中设置 meta.transition -->
```

### transition 高级用法

**1. 字符串策略** - 固定使用某个动画

```vue
<TransitionRouterView transition="slide-left" />
```

**2. 函数策略** - 根据路由和方向动态返回动画

```js
// 根据路由和方向动态返回动画名称
const getTransition = (route, direction) => {
  // direction: 'forward' | 'back'
  if (route.meta.noAnimation) {
    return '' // 禁用动画
  }
  return direction === 'forward' ? 'slide-left' : 'slide-right'
}
```

```vue
<template>
  <TransitionRouterView 
    :keep-alive="true"
    :include="['Home', 'About']"
    :transition="getTransition"
  />
</template>
```

**3. route.meta 优先** - 在路由配置中指定

```js
const routes = [
  {
    path: '/special-page',
    component: SpecialPage,
    meta: { 
      transition: 'slide-right' // 该页面使用特殊动画
    }
  }
]
```

优先级：`route.meta.transition` > `transition` prop > 默认 `slide-left`
