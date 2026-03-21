# Vite 插件支持策略

## 1. 目标

本文档用于明确 `vite-plugin-airx` 当前支持范围、风险边界与后续演进方向，避免主站或其他 Airx 应用在升级 Vite 时缺少判断依据。

## 2. 当前包状态

- 包名: `vite-plugin-airx`
- 当前版本: `0.2.0`
- peer dependency: `vite@^5.0.0`
- 核心代码入口: `source/index.ts`
- 构建方式: `tsc`

## 3. 当前插件职责

当前插件做的事情非常少且集中：

1. 注入 `esbuild.jsx = 'transform'`
2. 注入 `jsxFragment = '__airx__.Fragment'`
3. 注入 `jsxFactory = '__airx__.createElement'`
4. 注入 `jsxInject = import * as __airx__ from 'airx'`

结论：

- 这是一个“最小注入型插件”，主要职责是把 Airx 接入 Vite 的 JSX 转换链路。
- 它与 Airx 本身的强耦合点在于 `__airx__.Fragment` 与 `__airx__.createElement` 这两个导出约定。

## 4. 支持矩阵

### 4.1 当前声明范围

| 维度 | 当前声明 |
| --- | --- |
| 插件版本 | `0.2.0` |
| Vite 范围 | `^5.0.0` |
| Airx 注入约定 | `__airx__.Fragment`, `__airx__.createElement` |

### 4.2 实际环境观察

主站当前使用：

- Vite `7.3.1`
- 自定义插件链路，而不是 `vite-plugin-airx`

这说明：

- 该插件当前声明范围落后于主站真实环境
- 主站并未通过此插件接入 Airx，因此未来如果希望复用生态插件，需要先补齐支持策略和验证范围

### 4.3 支持结论

| Vite 主版本 | 当前状态 | 结论 |
| --- | --- | --- |
| 5.x | peer dependency 明确声明 | 官方支持目标 |
| 6.x | 无声明，无验证记录 | 待验证 |
| 7.x | 主站已在用，但未通过本插件验证 | 待验证，不能直接宣称支持 |

## 5. 风险边界

### 5.1 对 Vite 的耦合

插件使用的是 `config()` 钩子直接改写 `config.esbuild`。

风险点：

1. Vite 对 `config.esbuild` 的处理方式变化
2. JSX 注入机制在未来主版本中变化
3. `jsxInject` 行为与其他插件冲突

### 5.2 对 Airx 的耦合

插件默认要求 Airx 维持以下导出：

- `Fragment`
- `createElement`

一旦 Airx 更换 JSX 工厂命名或导出路径，插件必须同步更新。

## 6. 治理决策

### 6.1 当前推荐策略

- 把 `vite@^5.0.0` 视为已声明支持范围
- 把 `vite 6/7` 视为待验证范围
- 在没有示例验证前，不扩大 peer dependency 范围

### 6.2 验证优先级

优先验证：

1. Vite 7 下最小 Airx 应用是否能正常编译
2. JSX 注入是否与 TypeScript / esbuild 兼容
3. 与主站当前自定义链路相比，插件是否足够覆盖核心接入需求

## 7. 下一步建议

- 建立最小示例项目验证 `vite 5` 与 `vite 7`
- 补 README，说明当前支持范围与限制
- 若验证通过，再考虑把 peer dependency 从 `^5.0.0` 扩到更高主版本
