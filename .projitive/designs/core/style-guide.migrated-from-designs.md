# Style Guide

## 1. 概述

本文档定义 `vite-plugin-airx` 项目的代码风格规范和文档写作规范。

## 2. 代码风格

### 2.1 TypeScript 规范

**文件结构**：
```
source/index.ts  # 插件唯一入口，导出命名函数和 default 导出
```

**命名规范**：
- 插件主函数：`VitePluginAirx`（PascalCase，描述性命名）
- 导出：`export default VitePluginAirx`（默认导出供用户使用）
- 插件名称：`'airx'`（字符串字面量，简洁）

**代码风格**：
```typescript
// ✅ 正确：使用 explicit return，类型注解清晰
export function VitePluginAirx() {
  return {
    name: 'airx',
    config(config: UserConfig, env: { mode: string, command: string }) {
      config.esbuild = {
        ...config.esbuild,
        jsx: 'transform',
        jsxFragment: '__airx__.Fragment',
        jsxFactory: '__airx__.createElement',
        jsxInject: "import * as __airx__ from 'airx'"
      }
      return config
    },
  }
}

export default VitePluginAirx
```

**禁止**：
- ❌ 不使用 `export =` 语法（ESM 项目）
- ❌ 不混用 interface 和 type alias（统一用 type alias）
- ❌ 不使用 `any` 类型

### 2.2 package.json 规范

**字段要求**：
```json
{
  "name": "vite-plugin-airx",
  "version": "0.2.0",
  "type": "module",
  "types": "./output/index.d.ts",
  "exports": {
    ".": {
      "default": "./output/index.js",
      "import": "./output/index.js",
      "types": "./output/index.d.ts"
    }
  },
  "files": ["output/*"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc -w",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "vite": "^5.0.0"
  }
}
```

**版本规范**：
- 主版本变更： Breaking Change，需同步更新 Vite 支持策略
- 次版本变更：新功能或 Vite 版本支持扩展
- 修订版本：文档、CI、质量改进

## 3. 文档风格

### 3.1 文档位置

| 文档类型 | 位置 |
|---|---|
| 项目 README | `README.md`（根目录） |
| 治理文档 | `.projitive/` 目录 |
| 设计文档 | `.projitive/designs/` 目录 |
| 研究文档 | `.projitive/designs/research/` 目录 |

### 3.2 文档写作规范

**标题层级**：
- `# Architecture` - 文档主标题
- `## 1. 概述` - 一级章节
- `### 1.1 小节` - 二级小节

**表格格式**：
```markdown
| 列1 | 列2 | 列3 |
|---|---|---|
| 值1 | 值2 | 值3 |
```

**代码块**：
- 使用 `typescript` 标注 TypeScript 代码
- 使用 `bash` 标注命令行
- 使用 `json` 标注 JSON 配置

**状态标记**：
- ✅ 支持 / 已完成
- ⚠️ 待验证 / 风险
- ❌ 不支持 / 已移除
- ⏳ 进行中 / 待执行

### 3.3 设计文档结构

每个设计文档应包含：

```markdown
# Document Title

## 1. 目标
本文档的目的和范围。

## 2. 当前状态
现有状态描述。

## 3. 决策/规范
具体的决策或规范内容。

## 4. 相关文档
相关文档的链接。
```

## 4. 提交规范

### 4.1 Git 提交信息

格式：`<type>: <description>`

| type | 说明 |
|---|---|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `chore` | 构建/工具变更 |
| `refactor` | 代码重构（无功能变更） |
| `test` | 测试相关 |

示例：
```
docs: 完善 Vite 版本支持策略文档
feat: 添加 Vite 6.x 验证矩阵
chore: 更新 GitHub Actions Node 版本
```

### 4.2 Git Tag

格式：`v<major>.<minor>.<patch>`

示例：`v0.2.0`

## 5. 示例代码风格

### 5.1 examples/minimal/ 结构

```
examples/minimal/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    └── App.tsx
```

### 5.2 示例 package.json

```json
{
  "name": "vite-plugin-airx-minimal-example",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

## 6. CI/CD 风格

### 6.1 GitHub Actions

**触发条件**：
- `push` 到 `main` 分支
- 所有 PR

**Job 顺序**：
1. `build` - 编译验证
2. `typecheck` - 类型检查
3. `example-test` - 示例构建（需 build 成功）

**Node 版本**：`20`（当前 LTS）

## 7. 相关文档

- [Architecture](./architecture.md)
- [Vite 支持策略](../vite-support-policy.md)
- [发布验证基线](../release-verification-baseline.md)
