# vite-plugin-airx

Vite 插件，用于将 Airx JSX 转换接入 Vite 项目。
默认使用 automatic JSX runtime（`airx/jsx-runtime`）。

## 安装

```bash
npm install vite-plugin-airx
```

## 快速开始

### 1. 安装依赖

```bash
npm install airx vite-plugin-airx
```

### 2. 配置 vite.config.ts

```typescript
import { defineConfig } from 'vite'
import airx from 'vite-plugin-airx'

export default defineConfig({
  plugins: [airx()]
})
```

### 3. 编写组件

```tsx
import * as airx from 'airx'

function App() {
  return () => airx.createElement('div', null, 'Hello Airx!')
}

airx.createApp(airx.createElement(App)).mount(
  document.getElementById('root')!
)
```

## 工作原理

默认模式（automatic）通过 Vite `config` 钩子注入以下 esbuild 配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `jsx` | `'automatic'` | 启用自动 JSX 运行时 |
| `jsxImportSource` | `'airx'` | 指向 `airx/jsx-runtime` |

如果你需要兼容旧项目，也可以切回 classic 模式：

```typescript
import { defineConfig } from 'vite'
import airx from 'vite-plugin-airx'

export default defineConfig({
  plugins: [
    airx({
      runtime: 'classic'
    })
  ]
})
```

## Vite 版本支持

| 版本 | 支持状态 | 说明 |
|------|---------|------|
| Vite 5.x | ✅ 官方支持 | peerDependency 明确声明 |
| Vite 6.x | ✅ 官方支持 | peerDependency 明确声明 |
| Vite 7.x | ✅ 官方支持 | peerDependency 明确声明 |
| Vite 8.x | ✅ 官方支持 | 兼容 Rolldown 构建链路，JSX 配置仍通过 `esbuild` 生效 |

> 说明：Vite 8 使用 Rolldown 作为内部构建工具，但 JSX 转换配置仍通过 Vite 的 `esbuild` 选项统一接入。

## 示例

见 `examples/minimal/` 目录，包含完整的最小可运行示例。

## 配置参考

### 可选配置

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `runtime` | `'automatic' \| 'classic'` | `'automatic'` | 选择 JSX 运行时模式 |
| `importSource` | `string` | `'airx'` | automatic 模式下的导入源 |

classic 模式使用固定注入：

- `jsxFactory`: `__airx__.createElement`
- `jsxFragment`: `__airx__.Fragment`
- `jsxInject`: `import * as __airx__ from 'airx'`

## 演进路线

### v0.2.x（当前）

- 零配置插件
- 支持 Vite 5.x
- 最小 JSX 注入

### v0.3.x（计划中）

- 支持 Vite 6.x
- 配置选项扩展
- 完整的 CI 验证

### v1.0.0（计划中）

- 移除 Vite 5.x 支持
- 稳定 API
- 完整的文档和示例

## 系统限制

- 插件依赖 `airx` 包导出 `Fragment` 和 `createElement`
- 暂不支持 SSR 场景
- 不与其他 JSX 插件（如 `@vitejs/plugin-react`）同时使用

## 升级指南

### 从 v0.1.x 升级到 v0.2.x

v0.2.x 保持向后兼容，升级步骤：

```bash
npm install vite-plugin-airx@latest
```

## 相关文档

- [Vite 支持策略](./.projitive/designs/vite-support-policy.md)
- [发布验证基线](./.projitive/designs/release-verification-baseline.md)
