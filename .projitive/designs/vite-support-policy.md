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
| Node.js 范围 | `>=14.0.0` |
| TypeScript | `>=4.5.0` |
| Airx 注入约定 | `__airx__.Fragment`, `__airx__.createElement` |

### 4.2 实际环境观察

主站当前使用：

- Vite `7.3.1`
- 自定义插件链路，而不是 `vite-plugin-airx`

这说明：

- 该插件当前声明范围落后于主站真实环境
- 主站并未通过此插件接入 Airx，因此未来如果希望复用生态插件，需要先补齐支持策略和验证范围

---

## 5. 版本支持策略（待执行TASK-0005的产出）

### 5.1 目标版本范围

经过协调，目标支持范围应为：

```
airx-vite-plugin@0.2.0+
├─ 支持Vite: ^5.0.0 || ^6.0.0 || ^7.0.0
├─ 支持Node.js: >=16.0.0（升级自14.0.0）
├─ 支持TypeScript: >=4.5.0
└─ 支持airx: >=0.6.0
```

### 5.2 版本对应关系

| airx版本 | vite-plugin版本 | Vite支持 | 发布日期 |
|---------|----------------|--------|--------|
| 0.6.0-beta.1 | 0.1.5 | ^5.0.0 | 2026-03-15 |
| 0.7.0 (计划) | 0.2.0 (计划) | ^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0 | 2026-04-01 |
| 1.0.0 (计划) | 1.0.0 (计划) | ^6.0.0 \|\| ^7.0.0 | 2027-06 |

### 5.3 Breaking Change政策

目标在TASK-0005中定义：

- [ ] 何时通知breaking changes（弃用期至少1个月）
- [ ] package.json更新规则
- [ ] 迁移指南的发布时机

---

## 6. 验证矩阵（待执行TASK-0006的产出）

### 6.1 测试范围

```
Vite 5.x 验证
└─ JSX注入正确性
   ├─ __airx__.createElement 调用正确
   ├─ __airx__.Fragment 支持
   └─ esbuild.jsx='transform' 生效

Vite 6.x 验证
└─ JSX注入正确性
   ├─ __airx__.createElement 调用正确
   ├─ __airx__.Fragment 支持
   └─ esbuild.jsx='transform' 生效

Vite 7.x 验证
└─ JSX注入正确性
   ├─ __airx__.createElement 调用正确
   ├─ __airx__.Fragment 支持
   └─ esbuild.jsx='transform' 生效
```

### 6.2 验证检查清单（待定义）

- [ ] npm run typecheck 通过
- [ ] npm run lint 通过
- [ ] npm test -- --run 通过
- [ ] examples/ 所有示例可运行
- [ ] 构建产物大小无显著变化

---

## 7. 升级路线时间表

| 阶段 | 时间 | 版本 | 关键动作 |
|------|------|------|--------|
| Phase 1 Beta | 2026-03-22 | v0.2.0 | 完成版本支持文档 |
| Phase 2 验证 | 2026-03-23 | v0.2.x | 完成验证矩阵定义 |
| Phase 3 发布 | 2026-04-01 | v0.2.0 发布 | 与airx@0.7.0同步发布 |
| Phase 4 稳定 | 2026-06 | v1.0.0 | 移除Vite 5.x支持 |

---

## 8. 与主站的协调

### 8.1 当前状态

主站未使用此插件，而是自定义JSX注入逻辑。

### 8.2 未来集成计划

当插件达到v1.0.0稳定版本后，主站应考虑：

```ts
// vite.config.js
import viteAirxPlugin from 'airx-vite-plugin'

export default {
  plugins: [viteAirxPlugin()]
}
```

这样可以共享生态插件，减少重复维护。

---

## 9. 相关的TASK任务

本策略文档支撑以下任务：

- **TASK-0005** (此任务): 建立Vite插件版本支持与升级路线
- **TASK-0006**: 定义插件可用性与兼容验证矩阵
- **TASK-0007**: 定义插件对Signals运行时的集成验证策略
- **TASK-0003**: 建立插件发布与示例验证基线
- **TASK-0004**: 完善插件使用文档与演进说明

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
