# 插件发布与示例验证基线

## 1. 目标

本文档定义 `vite-plugin-airx` 的发布质量门禁和示例验证基线，确保插件在各种 Vite 版本下的行为可预期。

## 2. 当前包状态

- 包名: `vite-plugin-airx`
- 当前版本: `0.2.0`
- 构建方式: `tsc`
- 验证基线状态: 建设中

## 3. 插件职责

当前插件注入以下 esbuild 配置：

- `esbuild.jsx = 'transform'`
- `esbuild.jsxFragment = '__airx__.Fragment'`
- `esbuild.jsxFactory = '__airx__.createElement'`
- `esbuild.jsxInject = "import * as __airx__ from 'airx'"`

## 4. 示例验证基线

### 4.1 最小验证示例

创建 `examples/minimal/` 目录，包含：

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

**package.json**:

```json
{
  "name": "vite-plugin-airx-minimal-example",
  "version": "0.0.0",
  "private": true,
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
    "vite-plugin-airx": "workspace:*",
    "typescript": "^5.0.0"
  }
}
```

**vite.config.ts**:

```typescript
import { defineConfig } from 'vite'
import airx from 'vite-plugin-airx'

export default defineConfig({
  plugins: [airx()]
})
```

**src/App.tsx**:

```tsx
import * as airx from 'airx'

function Title() {
  return () => airx.createElement('h1', null, 'Hello from Airx!')
}

export function App() {
  return () => airx.createElement(Title)
}
```

**src/main.tsx**:

```tsx
import * as airx from 'airx'
import { App } from './App'

airx.createApp(airx.createElement(App)).mount(
  document.getElementById('root')!
)
```

### 4.2 Vite 版本验证矩阵

| Vite 版本 | 示例构建 | 示例运行 | 状态 |
| --- | --- | --- | --- |
| `5.x` | 待验证 | 待验证 | 需测试 |
| `6.x` | 待验证 | 待验证 | 需测试 |
| `7.x` | 待验证 | 待验证 | 需测试 |

## 5. 发布质量门禁

### 5.1 构建门禁

| 检查项 | 命令 | 验收标准 |
| --- | --- | --- |
| TypeScript 编译 | `npm run build` | 退出码为 0 |
| 类型声明 | `output/index.d.ts` 存在 | 文件非空 |
| 输出文件 | 检查 `output/` | 包含 `index.js` 和 `index.d.ts` |

### 5.2 质量门禁

| 检查项 | 命令/方式 | 验收标准 |
| --- | --- | --- |
| TypeScript 类型检查 | `npx tsc --noEmit` | 无类型错误 |
| 最小示例构建 | `cd examples/minimal && npm install && npm run build` | 构建成功 |
| peerDependencies 验证 | `npm ls vite` | 版本符合 `^5.0.0` |

### 5.3 发布门禁

| 检查项 | 验收标准 |
| --- | --- |
| 版本号规范 | 符合 semver |
| Changelog | 有本次变更记录 |
| npm publish dry-run | 文件列表正确 |
| Git tag | 对应版本有 tag |

## 6. GitHub Actions 工作流增强

### 6.1 建议的 check.yml

```yaml
name: Code Check

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["*"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx tsc --noEmit
```

### 6.2 示例验证 Job

```yaml
  example-test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup examples
        run: |
          cd examples/minimal
          npm install
      - name: Build example
        run: |
          cd examples/minimal
          npm run build
        env:
          # 确保使用本地插件
          npm_config_registry: 'http://localhost:4873'
```

## 7. README 增强建议

当前 README 只有 `# vite-plugin`，需要补充：

### 7.1 建议的 README 内容

```markdown
# vite-plugin-airx

Vite 插件，用于将 Airx JSX 转换接入 Vite 项目。

## 安装

```bash
npm install vite-plugin-airx
```

## 使用

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import airx from 'vite-plugin-airx'

export default defineConfig({
  plugins: [airx()]
})
```

## Vite 版本支持

| 版本 | 支持状态 |
| --- | --- |
| 5.x | ✅ 官方支持 |
| 6.x | ⚠️ 待验证 |
| 7.x | ⚠️ 待验证 |

## 示例

见 `examples/minimal/` 目录。

## 限制

- 插件依赖 `airx` 包导出 `Fragment` 和 `createElement`
- 暂不支持 SSR 场景
```

## 8. 待办事项

- [ ] 创建 `examples/minimal/` 最小示例
- [ ] 验证 Vite 5.x 下示例可构建运行
- [ ] 验证 Vite 6.x 下示例可构建运行
- [ ] 验证 Vite 7.x 下示例可构建运行
- [ ] 增强 README 说明
- [ ] 补充 GitHub Actions 示例验证 job

## 9. 相关文档

- [Vite 支持策略](./vite-support-policy.md)
