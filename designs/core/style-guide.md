# Style Guide - vite-plugin-airx

## 1. TypeScript 代码风格

### 1.1 类型系统

- 启用严格模式 (`"strict": true`)
- 避免 `any`，使用 `unknown` 配合类型守卫
- 使用 Vite 内置类型 (`UserConfig`, `Plugin`) 而非自行定义

### 1.2 函数设计

```typescript
// ✅ 正确：显式返回类型，命名导出
export function VitePluginAirx(): Plugin {
  return { name: 'airx', config }
}

// ✅ 正确：default export 提供便捷调用
export default VitePluginAirx
```

### 1.3 Vite 配置合并

```typescript
// ✅ 正确：展开保留原有 esbuild 配置
config.esbuild = {
  ...config.esbuild,
  jsx: 'transform',
  jsxFragment: '__airx__.Fragment',
  jsxFactory: '__airx__.createElement',
  jsxInject: "import * as __airx__ from 'airx'"
}
```

## 2. API 设计原则

### 2.1 最小 API 表面

当前插件无配置选项，保持零配置体验：

```typescript
// 使用方式
import airx from 'vite-plugin-airx'
export default { plugins: [airx()] }
```

### 2.2 向后兼容

- peerDependency 范围只扩展不清紧
- Breaking changes 需要 major 版本升级 + 至少 1 个月弃用通知

## 3. 文档风格

- README.md 提供快速上手
- CHANGELOG 记录每个版本的变更
- designs/ 目录存放技术决策与验证文档

## 4. 发布规范

- 版本号遵循 semver
- npm 包格式符合 `vite-plugin-*` 约定
- 构建产物包含类型声明

## 5. 相关文档

- [Architecture](./architecture.md)
- [Vite 支持策略](../vite-support-policy.md)
