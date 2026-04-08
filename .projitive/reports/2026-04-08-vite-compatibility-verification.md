# Vite 7.x/8.x 兼容性验证报告 — 2026-04-08

## 任务状态
- **任务**: TASK-0013 验证 Vite 7.x/8.x 兼容性并更新支持策略
- **状态**: DONE
- **执行时间**: 2026-04-08

## 验证摘要

在 `examples/minimal/` 中分别使用 Vite 5.x（baseline）、7.x、8.x 执行构建测试：

| Vite 版本 | 构建结果 | JSX 转换 | 文件大小 (gzip) | 备注 |
|-----------|---------|---------|----------------|------|
| 5.4.21 | ✅ 通过 | ✅ `A()` createElement 正确 | 7.14 KB | Baseline |
| 7.3.2 | ✅ 通过 | ✅ `A()` createElement + `Se` Fragment 正确 | 6.71 KB | — |
| 8.0.7 | ✅ 通过（有警告） | ✅ `A()` createElement 正确 | 6.02 KB | ⚠️ esbuild 选项弃用 |

## Vite 8.x 警告详情

```
esbuild option was specified by "airx" plugin. This option is deprecated, please use `oxc` instead.
```

- **影响**: 当前不影响功能，Vite 8 仍会将 esbuild JSX 配置传递给 esbuild 处理
- **风险**: 未来 Vite 大版本可能完全移除 esbuild 配置支持，插件需迁移到 oxc 配置方式
- **建议**: 跟踪 [vite-plugin-oxc](https://github.com/vitejs/vite/discussions/18789) 进展

## 执行动作

1. **构建验证**: 临时修改 `examples/minimal/package.json` 的 vite 版本，运行 `npm run build`
2. **JSX 产物检查**: 确认输出中 JSX 已正确转换为 `A()` 函数调用
3. **文档更新**: 更新 `designs/vite-support-policy.md` §4 和 §6.6

## 下一步

- Vite 6.x 手动验证（预计兼容，无需 Breaking Change）
- 跟踪 oxc 迁移计划，在 Vite 9.x 之前评估插件适配方案
- 考虑在 CI 中添加多版本矩阵测试

## 关联
- Refs: TASK-0013, ROADMAP-0002
