# 插件对 Signals 运行时的集成验证策略

## 1. 目标

本文档定义 `vite-plugin-airx` 与 Signals 运行时集成的验证策略，确保：
- JSX 注入与 Signals 编译链无偏差
- 插件升级不会破坏 Signals 相关编译链
- Signals 响应式表达式在 JSX 中的正确转换

## 2. 当前插件职责与 Signals 关联

### 2.1 插件注入配置

```typescript
config.esbuild = {
  jsx: 'transform',
  jsxFragment: '__airx__.Fragment',
  jsxFactory: '__airx__.createElement',
  jsxInject: "import * as __airx__ from 'airx'"
}
```

### 2.2 Signals 运行时关键 API

| API | 用途 | JSX 中的典型用法 |
| --- | --- | --- |
| `Signal.State(value)` | 创建响应式状态 | `const count = new Signal.State(0)` |
| `Signal.Computed(fn)` | 创建派生计算 | `const doubled = new Signal.Computed(() => count.get() * 2)` |
| `effect(fn)` | 副作用执行 | `effect(() => console.log(count.get()))` |
| `count.get()` | 读取信号值 | `{count.get()}` 在 JSX 中 |

### 2.3 风险点分析

| 风险点 | 描述 | 潜在影响 |
| --- | --- | --- |
| JSX 内联求值时机 | Signals 是延迟求值的，JSX 是立即求值 | JSX 内 `{count.get()}` 可能捕获过期的值 |
| 编译转换冲突 | esbuild JSX transform 可能干扰 Signals 语法解析 | `{count.get()}` 被错误解析 |
| 循环依赖 | JSX 工厂函数内调用 Signals 可能产生循环 | 渲染函数触发 effect，effect 又触发渲染 |

## 3. 验证点定义

### 3.1 JSX 注入验证点

| 验证点 | 描述 | 验证方式 |
| --- | --- | --- |
| VP-JSX-001 | `jsxInject` 正确插入 `import * as __airx__ from 'airx'` | 编译后检查 bundle 是否包含注入语句 |
| VP-JSX-002 | `jsxFactory` 正确映射到 `__airx__.createElement` | 编译后检查 factory 函数引用 |
| VP-JSX-003 | `jsxFragment` 正确映射到 `__airx__.Fragment` | 编译后检查 Fragment 引用 |
| VP-JSX-004 | 多文件场景下注入不重复 | 检查 bundle 中注入语句数量 |
| VP-JSX-005 | 注入位置在文件头部 | 检查注入语句在 bundle 中的位置 |

### 3.2 Signals 运行时互操作验证点

| 验证点 | 描述 | 验证方式 |
| --- | --- | --- |
| VP-SIG-001 | `Signal.State` 在 JSX 中正常读取 | 编译后 bundle 包含 `Signal.State` 调用 |
| VP-SIG-002 | `Signal.Computed` 在 JSX 中正常读取 | 编译后 bundle 包含 `Signal.Computed` 调用 |
| VP-SIG-003 | `{signal.get()}` 表达式在 JSX 中正确求值 | 运行时验证：render 后 signal 值正确显示 |
| VP-SIG-004 | effect 回调中更新 state 触发 re-render | 运行时验证：effect 执行后 UI 更新 |
| VP-SIG-005 | 多个 computed 依赖链正确传播 | 运行时验证：`a.get() -> b.get() -> c.get()` 链式更新 |

### 3.3 编译链兼容性验证点

| 验证点 | 描述 | 验证方式 |
| --- | --- | --- |
| VP-COMP-001 | TypeScript 编译无新增错误 | `tsc --noEmit` 无错误 |
| VP-COMP-002 | esbuild transform 正确处理 Signals 语法 | 检查编译产物中 Signals 表达式完整性 |
| VP-COMP-003 | Vite HMR 在 Signals 使用场景下正常 | dev 模式下修改 signal 触发更新 |
| VP-COMP-004 | 生产构建 bundle 包含完整 Signals 代码 | 检查 output 中 Signals 相关代码 |

## 4. 验证矩阵

### 4.1 Signals 功能验证矩阵

| 验证用例 | 描述 | 期望结果 | 状态 |
| --- | --- | --- | --- |
| SIG-TS-01 | JSX 中使用 `Signal.State` | State 值正确渲染 | 待验证 |
| SIG-TS-02 | JSX 中使用 `Signal.Computed` | Computed 派生值正确渲染 | 待验证 |
| SIG-TS-03 | effect 中更新 state | UI 自动更新 | 待验证 |
| SIG-TS-04 | 嵌套 computed 依赖 | 多层派生正确计算 | 待验证 |
| SIG-TS-05 | 条件 JSX 中的 signal | 条件分支正确响应 signal 变化 | 待验证 |
| SIG-TS-06 | 列表渲染中的 signal | 列表项正确响应 signal 变化 | 待验证 |

### 4.2 插件升级回归验证

| 验证用例 | 描述 | 触发条件 | 状态 |
| --- | --- | --- | --- |
| REG-01 | 升级后 JSX 注入位置不变 | 插件版本变更 | 待验证 |
| REG-02 | 升级后 factory 映射不变 | 插件版本变更 | 待验证 |
| REG-03 | 升级后 Signals 编译链完整 | 插件版本变更 | 待验证 |
| REG-04 | 升级后 HMR 行为不变 | 插件版本变更 | 待验证 |

## 5. 最小验证示例

### 5.1 Signals 验证示例

```tsx
// src/SignalsApp.tsx
import { Signal } from "signal-polyfill"
import { effect } from "./effect"

const counter = new Signal.State(0)
const doubled = new Signal.Computed(() => counter.get() * 2)

function Counter() {
  return () => (
    <div>
      <p>Count: {counter.get()}</p>
      <p>Doubled: {doubled.get()}</p>
      <button onClick={() => counter.set(counter.get() + 1)}>
        Increment
      </button>
    </div>
  )
}

export function App() {
  return () => <Counter />
}
```

### 5.2 验证检查清单

- [ ] SIG-TS-01: 编译通过，`counter.get()` 被正确转换
- [ ] SIG-TS-02: 编译通过，`doubled.get()` 被正确转换
- [ ] SIG-TS-03: 开发服务器运行，点击按钮 counter 和 doubled 更新
- [ ] REG-01: 检查 bundle 中注入语句在文件头部
- [ ] REG-03: 检查 bundle 中 `Signal.State` 和 `Signal.Computed` 存在

## 6. 回归测试策略

### 6.1 CI 门禁

```yaml
signals-integration-test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
    - name: Install dependencies
      run: npm ci
    - name: Build plugin
      run: npm run build
    - name: Test Signals JSX compilation
      run: |
        cd examples/signals
        npm install
        npm run build
        # 验证 bundle 中包含预期内容
        grep -q "Signal.State" dist/bundle.js
        grep -q "Signal.Computed" dist/bundle.js
```

### 6.2 版本变更检查点

当插件版本变更时，必须验证：

1. **小版本升级（0.2.x）**：运行 Signals 集成测试，确保 JSX 注入逻辑兼容
2. **大版本升级（1.0.0）**：重新审查 Signals 编译链，验证所有验证点
3. **breaking changes**：明确 Signals 支持范围变更，通知相关方

## 7. 相关文档

- [发布验证基线](./release-verification-baseline.md)
- [Vite 支持策略](./vite-support-policy.md)
- [Signals Proposal](https://github.com/proposal-signals/signal-polyfill)

## 8. 后续任务

- [ ] 创建 `examples/signals/` 验证示例
- [ ] 补充 SIG-TS 系列验证用例
- [ ] 建立 CI 门禁中的 Signals 回归测试
- [ ] 明确插件升级时 Signals 兼容性检查流程
