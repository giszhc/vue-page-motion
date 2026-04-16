import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import TransitionRouterView from '../dist/index.js'

// 引入样式
import '../dist/index.css'

// 页面组件
const Home = {
    template: `
        <div class="page home">
            <h1>控制台概览</h1>
            <p>欢迎使用运维管理平台，这里是系统运行状态的实时监控中心。</p>
            
            <div class="info-card">
                <h2>📊 系统状态</h2>
                <ul>
                    <li>CPU 使用率：<code>45%</code></li>
                    <li>内存使用率：<code>62%</code></li>
                    <li>磁盘使用率：<code>38%</code></li>
                    <li>网络流量：<code>125 Mbps</code></li>
                    <li>运行时间：<code>15 天 8 小时</code></li>
                </ul>
            </div>
            
            <div class="info-card">
                <h2>🚀 快速操作</h2>
                <ul>
                    <li>查看服务器列表 → 服务器管理</li>
                    <li>查看监控图表 → 监控告警</li>
                    <li>配置系统参数 → 系统设置</li>
                </ul>
            </div>
        </div>
    `
}

const About = {
    template: `
        <div class="page about">
            <h1>服务器管理</h1>
            <p>管理所有服务器实例，查看运行状态和资源配置。</p>
            
            <div class="info-card">
                <h2>🖥️ 服务器列表</h2>
                <ul>
                    <li>Web-Server-01：<code style="background:#f6ffed;color:#52c41a;border-color:#b7eb8f;">运行中</code></li>
                    <li>Web-Server-02：<code style="background:#f6ffed;color:#52c41a;border-color:#b7eb8f;">运行中</code></li>
                    <li>DB-Server-01：<code style="background:#f6ffed;color:#52c41a;border-color:#b7eb8f;">运行中</code></li>
                    <li>Cache-Server-01：<code style="background:#fffbe6;color:#faad14;border-color:#ffe58f;">维护中</code></li>
                    <li>API-Gateway：<code style="background:#f6ffed;color:#52c41a;border-color:#b7eb8f;">运行中</code></li>
                </ul>
            </div>
            
            <div class="info-card">
                <h2>📈 资源统计</h2>
                <ul>
                    <li>总服务器数：5 台</li>
                    <li>运行中：4 台</li>
                    <li>维护中：1 台</li>
                    <li>平均 CPU：<code>42%</code></li>
                    <li>平均内存：<code>58%</code></li>
                </ul>
            </div>
        </div>
    `
}

const Contact = {
    template: `
        <div class="page contact">
            <h1>监控告警</h1>
            <p>实时监控系统运行状态，接收和处理各类告警信息。</p>
            
            <div class="info-card">
                <h2>🔔 最近告警</h2>
                <ul>
                    <li><code style="background:#fff1f0;color:#ff4d4f;border-color:#ffa39e;">严重</code> DB-Server-01 磁盘使用率超过 90%</li>
                    <li><code style="background:#fffbe6;color:#faad14;border-color:#ffe58f;">警告</code> Web-Server-02 CPU 使用率超过 80%</li>
                    <li><code style="background:#f6ffed;color:#52c41a;border-color:#b7eb8f;">正常</code> Cache-Server-01 维护完成</li>
                    <li><code style="background:#fff1f0;color:#ff4d4f;border-color:#ffa39e;">严重</code> API-Gateway 响应时间超过 5s</li>
                </ul>
            </div>
            
            <div class="info-card">
                <h2>📊 监控指标</h2>
                <ul>
                    <li>今日告警总数：12 次</li>
                    <li>严重告警：3 次</li>
                    <li>警告：5 次</li>
                    <li>已处理：10 次</li>
                    <li>待处理：2 次</li>
                </ul>
            </div>
        </div>
    `
}

const Settings = {
    name: 'Settings',
    data() {
        return {
            inputValue: '',
            scrollPosition: 0
        }
    },
    mounted() {
        // 恢复滚动位置
        if (this.scrollPosition) {
            window.scrollTo(0, this.scrollPosition)
        }
    },
    beforeUnmount() {
        // 保存滚动位置
        this.scrollPosition = window.scrollY
    },
    template: `
        <div class="page settings">
            <h1>系统设置（KeepAlive 演示）</h1>
            <p>配置系统参数，此页面启用了 KeepAlive 缓存。</p>
            
            <div class="info-card">
                <h2>⚙️ 基础配置</h2>
                <ul>
                    <li>在下方输入框中修改配置</li>
                    <li>切换到其他页面后再回来</li>
                    <li>输入的内容会保持（KeepAlive 生效）</li>
                    <li>适合表单页、配置页等场景</li>
                </ul>
                
                <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e8e8e8;">
                    <label style="display: block; margin-bottom: 8px; color: #262626; font-weight: 500;">系统备注：</label>
                    <input 
                        v-model="inputValue" 
                        placeholder="输入系统备注信息..."
                        style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 2px; font-size: 14px; transition: all 0.3s;"
                        @focus="$event.target.style.borderColor = '#40a9ff'; $event.target.style.boxShadow = '0 0 0 2px rgba(24,144,255,0.2)'"
                        @blur="$event.target.style.borderColor = '#d9d9d9'; $event.target.style.boxShadow = 'none'"
                    />
                    <p v-if="inputValue" style="margin-top: 12px; color: #1890ff; font-size: 14px;">
                        当前备注：{{ inputValue }}
                    </p>
                </div>
                
                <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 2px; border-left: 3px solid #1890ff;">
                    <p style="color: #595959; font-size: 13px; margin: 0;">
                        💡 提示：输入内容后切换到其他页面，再返回时内容依然存在，证明 KeepAlive 缓存生效
                    </p>
                </div>
            </div>
        </div>
    `
}

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            meta: { title: '首页' }
        },
        {
            path: '/about',
            component: About,
            meta: { title: '关于' }
        },
        {
            path: '/contact',
            component: Contact,
            meta: { title: '联系' }
        },
        {
            path: '/settings',
            component: Settings,
            meta: { 
                title: '设置',
                key: 'settings-page' // KeepAlive 的 key
            }
        }
    ]
})

// 创建应用
const app = createApp({
    data() {
        return {
            isModernTheme: false
        }
    },
    methods: {
        toggleTheme() {
            this.isModernTheme = !this.isModernTheme
            document.body.className = this.isModernTheme ? 'modern-theme' : ''
        }
    },
    template: `
        <div>
            <button class="theme-toggle" @click="toggleTheme">
                {{ isModernTheme ? '🎨 切换到运维风格' : '📊 切换到现代风格' }}
            </button>
            
            <nav class="navbar">
                <ul class="nav-links">
                    <li><router-link to="/">控制台</router-link></li>
                    <li><router-link to="/about">服务器管理</router-link></li>
                    <li><router-link to="/contact">监控告警</router-link></li>
                    <li><router-link to="/settings">系统设置</router-link></li>
                </ul>
            </nav>
            
            <!-- 使用 TransitionRouterView -->
            <TransitionRouterView 
                :keep-alive="true"
                :include="['Settings']"
            />
        </div>
    `
})

// 使用插件
app.use(router)
app.use(TransitionRouterView)

app.mount('#app')
