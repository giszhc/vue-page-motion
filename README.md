# @giszhc/vue-page-motion

一个轻量、优雅的 Vue3 路由页面过渡动画组件。

## ✨ 特性

* 🎬 **智能方向检测** - 自动识别路由前进/后退，应用不同动画
* 💾 **KeepAlive 支持** - 可选的组件缓存，保持页面状态
* 🎯 **灵活动画策略** - 支持固定动画、动态函数、route.meta 配置
* 📦 **开箱即用** - 内置常用过渡动画，零配置即可使用
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

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mode | 过渡模式，`in-out` 新元素先进入，`out-in` 旧元素先离开 | `'in-out' \| 'out-in'` | `'out-in'` |
| wrapperClass | 包裹元素的 CSS 类名 | `string` | `'transition-router-view'` |
| keepAlive | 是否启用 KeepAlive 缓存 | `boolean` | `false` |
| include | KeepAlive 包含的组件名称 | `string \| RegExp \| Array` | - |
| exclude | KeepAlive 排除的组件名称 | `string \| RegExp \| Array` | - |
| transition | 过渡动画策略：字符串（固定动画）、函数（动态返回）、undefined（默认左右滑动） | `string \| function \| undefined` | `undefined` |

### transition 函数示例

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
