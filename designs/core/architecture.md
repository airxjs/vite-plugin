# Architecture - vite-plugin-airx

## 1. 插件模块结构

```
vite-plugin-airx/
├── source/
│   └── index.ts          # 插件主入口，唯一模块
├── output/                # TSC 编译产物
│   ├── index.js
│   └── index.d.ts
├── package.json
├── tsconfig.json
└── designs/
    └── core/
        └── architecture.md
```

**核心职责**：通过 Vite `config` 钩子注入 esbuild JSX 配置，将 Airx JSX 转换接入 Vite 构建链路。

## 2. API 边界与约束

### 2.1 插件导出

```typescript
// source/index.ts
export function VitePluginAirx(): Plugin
export default VitePluginAirx
```

### 2.2 Vite config 钩子行为

插件使用 `config()` 钩子直接改写 `config.esbuild` 对象：

```typescript
config(config: UserConfig, env: { mode: string, command: string }) {
  config.esbuild = {
    ...config.esbuild,
    jsx: 'transform',
    jsxFragment: '__airx__.Fragment',
    jsxFactory: '__airx__.createElement',
    jsxInject: "import * as __airx__ from 'airx'"
  }
  return config
}
```

### 2.3 与 Vite 的耦合点

| 耦合点 | 当前实现 | 风险 |
|--------|---------|------|
| `config.esbuild` | 直接赋值 merge | Vite 6/7 对 esbuild 处理可能变化 |
| JSX 注入机制 | esbuild `jsxInject` | 与其他 JSX 插件冲突风险 |
| Airx 导出约定 | `__airx__.Fragment/createElement` | Airx 改名则插件失效 |

### 2.4 与 Airx 的耦合点

插件要求 Airx 必须维持以下导出：

```typescript
// airx 包的必需导出
export const Fragment: Fragment
export function createElement(type: any, props?: any, ...children: any[]): VNode
```

## 3. 构建链路

- 编译方式：`tsc` (TypeScript Compiler)
- 输出格式：`output/` 目录，ESM
- 类型声明：`output/index.d.ts`
- 无额外构建工具依赖

## 4. 模块职责

| 模块 | 职责 |
|------|------|
| `source/index.ts` | 插件主入口，提供 `config()` 钩子 |
| `output/index.js` | TSC 编译产物，npm 包的入口文件 |
| `output/index.d.ts` | TSC 生成类型声明 |

## 5. 扩展点

当前为最小注入型插件，无配置选项。未来可扩展方向：

- 支持自定义 jsxFactory/jsxFragment 名称
- 支持自定义 airx 导入路径
- 支持 SSR 场景

## 6. 相关文档

- [Vite 支持策略](../vite-support-policy.md)
- [发布验证基线](../release-verification-baseline.md)
