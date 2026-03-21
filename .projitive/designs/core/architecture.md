# Architecture

## 1. 概述

`vite-plugin-airx` 是一个最小注入型 Vite 插件，负责将 Airx JSX 转换接入 Vite 项目。

## 2. 核心职责

插件仅通过 Vite `config()` 钩子注入 esbuild JSX 配置：

| esbuild 配置项 | 值 | 作用 |
|---|---|---|
| `jsx` | `'transform'` | 启用 esbuild JSX 转换 |
| `jsxFactory` | `'__airx__.createElement'` | JSX 元素工厂函数 |
| `jsxFragment` | `'__airx__.Fragment'` | Fragment 工厂函数 |
| `jsxInject` | `import * as __airx__ from 'airx'` | 每个文件头部注入 airx import |

**结论**：插件职责极简，仅做 JSX 转换链路注入，不做运行时干预。

## 3. 代码结构

```
vite-plugin-airx/
├── source/index.ts          # 插件唯一入口，仅一个 config() 钩子
├── output/                  # TypeScript 编译输出（发布到 npm）
│   ├── index.js
│   └── index.d.ts
├── examples/minimal/        # 最小验证示例（待完善）
├── .projitive/              # 治理目录
│   ├── designs/
│   │   ├── vite-support-policy.md        # Vite 版本支持策略
│   │   ├── release-verification-baseline.md  # 发布验证基线
│   │   ├── signals-runtime-verification.md   # Signals 运行时验证
│   │   ├── plugin-integration-guide.md       # 插件集成指南
│   │   └── core/
│   │       ├── architecture.md   # 本文档
│   │       └── style-guide.md     # 样式规范
│   └── tasks.md               # 任务追踪
└── package.json
```

## 4. 模块边界

### 4.1 source/index.ts（唯一模块）

**职责边界**：
- ✅ 只使用 `config()` 钩子
- ✅ 只修改 `config.esbuild` 对象
- ❌ 不使用 `transform()`、`resolveId()` 等其他钩子
- ❌ 不做运行时干预（无 React/DOM 操作）
- ❌ 不做产物修改（无 bundle 分析）

**对外依赖**：
- Vite（peerDependency：`^5.0.0`）
- TypeScript（devDependency）
- Airx（运行时依赖，用户侧提供）

### 4.2 examples/minimal/（验证示例）

**职责边界**：
- ✅ 验证插件在真实 Vite 项目中的行为
- ✅ 覆盖 JSX 基本场景（元素、表达式、Fragment、函数组件）
- ❌ 不验证 Signals 运行时（由 TASK-0007 覆盖）
- ❌ 不验证 SSR（未规划）

## 5. 技术约束

### 5.1 对 Vite 的耦合

- 插件通过 `config()` 钩子改写 `config.esbuild`
- Vite 版本升级可能影响 esbuild 配置处理方式
- `jsxInject` 与其他 JSX 插件（`@vitejs/plugin-react`）不能同时启用

### 5.2 对 Airx 的耦合

- 依赖 Airx 维持 `Fragment` 和 `createElement` 导出约定
- 一旦 Airx 更换导出路径，插件需同步更新 `jsxInject` 值

### 5.3 对 Node.js 的约束

- 最低支持 Node.js 14（TypeScript 构建产物兼容）
- Vite 本身要求 Node.js >= 14.18

## 6. 扩展方向（当前不支持）

| 功能 | 状态 | 说明 |
|---|---|---|
| 配置选项 | 未支持 | v0.3.x 计划 |
| SSR 支持 | 未支持 | 无计划 |
| HMR 支持 | 未测试 | 待验证 |
| JSX 插件冲突处理 | 未支持 | 需用户手动避免 |

## 7. 相关文档

- [Vite 支持策略](../vite-support-policy.md)
- [发布验证基线](../release-verification-baseline.md)
- [Signals 运行时验证](../signals-runtime-verification.md)
