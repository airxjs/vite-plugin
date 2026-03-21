# Vite Plugin Airx 集成指南

## 1. 概述

`vite-plugin-airx` 是 Airx 生态的 Vite 插件，负责将 Airx 的 JSX 转换接入 Vite 项目。

**版本**: `0.2.0`
**peer dependency**: `vite@^5.0.0`

## 2. 安装

```bash
npm install vite-plugin-airx
```

## 3. 快速开始

### 3.1 基本配置

在 `vite.config.ts` 中引入插件：

```typescript
import { defineConfig } from 'vite'
import airx from 'vite-plugin-airx'

export default defineConfig({
  plugins: [airx()]
})
```

### 3.2 最小示例

**package.json**:
```json
{
  "name": "airx-app",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "airx": "^0.3.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vite-plugin-airx": "^0.2.0"
  }
}
```

**src/App.tsx**:
```tsx
import * as airx from 'airx'

function App() {
  return () => (
    <div>
      <h1>Hello Airx</h1>
    </div>
  )
}

airx.createApp(airx.createElement(App)).mount(
  document.getElementById('root')!
)
```

## 4. 插件工作原理

插件注入以下 esbuild 配置：

| 配置项 | 值 | 说明 |
| --- | --- | --- |
| `jsx` | `'transform'` | 使用 JSX transform |
| `jsxFragment` | `'__airx__.Fragment'` | Fragment 工厂 |
| `jsxFactory` | `'__airx__.createElement'` | 元素工厂 |
| `jsxInject` | `import * as __airx__ from 'airx'` | 自动注入 airx 导入 |

## 5. 与 Airx 的耦合

插件依赖 Airx 维持以下导出约定：

- `airx.Fragment`
- `airx.createElement`

一旦 Airx 更改这些导出，插件需要同步更新。

## 6. Vite 版本支持

| Vite 版本 | 支持状态 | 说明 |
| --- | --- | --- |
| 5.x | ✅ 官方支持 | peer dependency 明确声明 |
| 6.x | ⚠️ 待验证 | 需实际测试 |
| 7.x | ⚠️ 待验证 | 已在部分项目中使用 |

## 7. 限制

1. **esbuild only**: 插件仅配置 esbuild 的 JSX 转换，不支持 SWC
2. **SSR**: 暂不支持 SSR 场景
3. **JSXInject**: 自动注入 `import * as __airx__` 可能与其他插件冲突

## 8. 演进路线

### 8.1 短期计划

- [ ] 建立 Vite 5/6/7 示例验证
- [ ] 补充 TypeScript 类型导出

### 8.2 长期方向

- [ ] 支持 SWC JSX 转换
- [ ] SSR 支持
- [ ] HMR 增强

## 9. 常见问题

### Q: 插件安装后构建报错？

确保 `airx` 包已正确安装：`npm install airx`

### Q: 与其他 Vite 插件冲突？

插件通过 `config()` 钩子修改 esbuild 配置，可能与其他做相同事情的插件冲突。尝试调整插件顺序。

### Q: 生产构建是否需要此插件？

是的，插件配置会同时影响开发和生产构建。

## 10. 相关文档

- [Vite 支持策略](./vite-support-policy.md)
- [发布与验证基线](./release-verification-baseline.md)
