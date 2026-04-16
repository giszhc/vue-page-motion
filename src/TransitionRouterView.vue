<template>
    <RouterView v-slot="{ Component, route }">
        <Transition :name="transitionName" :mode="mode">
            <KeepAlive v-if="keepAlive" :include="include" :exclude="exclude">
                <component
                    :is="Component"
                    :key="cacheKey(route)"
                    :class="wrapperClass"
                />
            </KeepAlive>

            <component
                v-else
                :is="Component"
                :key="cacheKey(route)"
                :class="wrapperClass"
            />
        </Transition>
    </RouterView>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {TransitionRouterViewProps} from "@/types";

type Direction = 'forward' | 'back'

const {
    mode = 'out-in',
    wrapperClass = 'transition-router-view',
    keepAlive = false,
    transition
} = defineProps<TransitionRouterViewProps>()

const route = useRoute()

// 👉 记录访问历史（用于判断前进/后退）
const historyStack = ref<string[]>([])
const direction = ref<Direction>('forward')

watch(
    () => route.fullPath,
    (to) => {
        const index = historyStack.value.indexOf(to)

        if (index !== -1) {
            // 返回
            historyStack.value.splice(index + 1)
            direction.value = 'back'
        } else {
            // 前进
            historyStack.value.push(to)
            direction.value = 'forward'
        }
    },
    {immediate: true}
)

// 👉 计算动画名称
const transitionName = computed(() => {
    // 1. route.meta 优先
    if (route.meta?.transition) {
        return route.meta.transition as string
    }

    // 2. 函数策略
    if (typeof transition === 'function') {
        return transition(route, direction.value)
    }

    // 3. 字符串策略
    if (typeof transition === 'string') {
        return transition
    }

    // 4. 默认策略（方向动画）
    return direction.value === 'forward'
        ? 'slide-left'
        : 'slide-right'
})

// 👉 key 策略（支持 meta 控制）
const cacheKey = (route: any) => {
    return route.meta?.key || route.path
}
</script>

<style lang="scss">
.transition-router-view {
    width: 100%;
    min-width: 0;
    min-height: 100%;
    overflow-x: hidden;
}

/* ===== 默认动画 ===== */

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

/* 👉 forward */
.slide-left-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

/* 👉 back */
.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* 👉 fallback */
.fade-transform-enter-active,
.fade-transform-leave-active {
    transition: opacity 0.3s;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
    opacity: 0;
}
</style>